import "server-only";
import { createHash } from "node:crypto";

const LIMIT = 5;
const WINDOW_SECONDS = 600;
const MAX_KEYS = 5000;
const hits = new Map<string, { count: number; resetAt: number }>();

function memoryAllow(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (entry && entry.resetAt > now) {
    entry.count += 1;
    return entry.count <= LIMIT;
  }
  hits.delete(key);
  if (hits.size >= MAX_KEYS) {
    // Map keeps insertion order, so the first key has the oldest window.
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  hits.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
  return true;
}

/** Returns false once a client exceeds the limit for the current window. */
export async function allowRequest(ip: string): Promise<boolean> {
  const key = `contact:${createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return memoryAllow(key);

  try {
    const response = await fetch(`${url}/multi-exec`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["SET", key, "0", "EX", String(WINDOW_SECONDS), "NX"],
        ["INCR", key],
      ]),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    const data = (await response.json()) as { result?: unknown }[];
    const count = Number(data[1]?.result);
    if (!response.ok || !Number.isFinite(count)) throw new Error("Unexpected rate limiter response");
    return count <= LIMIT;
  } catch {
    console.error("[contact] shared rate limiter unavailable, using memory");
    return memoryAllow(key);
  }
}
