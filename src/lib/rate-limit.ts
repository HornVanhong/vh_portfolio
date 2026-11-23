import "server-only";
import { createHash } from "node:crypto";

const MAX_KEYS = 5000;
const hits = new Map<string, { count: number; resetAt: number }>();

interface Limit {
  /** Separates counters of different features. */
  scope: string;
  limit: number;
  windowSeconds: number;
}

function memoryAllow(key: string, { limit, windowSeconds }: Limit): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (entry && entry.resetAt > now) {
    entry.count += 1;
    return entry.count <= limit;
  }
  hits.delete(key);
  if (hits.size >= MAX_KEYS) {
    // Map keeps insertion order, so the first key is the oldest.
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  hits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
  return true;
}

/** Returns false once the subject (an IP, or a constant for a site-wide cap) exceeds the limit. */
export async function allowRequest(subject: string, rule: Limit): Promise<boolean> {
  const key = `${rule.scope}:${createHash("sha256").update(subject).digest("hex").slice(0, 32)}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return memoryAllow(key, rule);

  try {
    const response = await fetch(`${url}/multi-exec`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["SET", key, "0", "EX", String(rule.windowSeconds), "NX"],
        ["INCR", key],
      ]),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    const data = (await response.json()) as { result?: unknown }[];
    const count = Number(data[1]?.result);
    if (!response.ok || !Number.isFinite(count)) throw new Error("Unexpected rate limiter response");
    return count <= rule.limit;
  } catch {
    console.error("[rate-limit] shared limiter unavailable, using memory");
    return memoryAllow(key, rule);
  }
}
