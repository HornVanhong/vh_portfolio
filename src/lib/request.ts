import "server-only";
import type { NextRequest } from "next/server";

/** Reads at most maxBytes, so a missing or false Content-Length cannot bypass the cap. Null means too large. */
export async function readBody(request: NextRequest, maxBytes: number): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Set by the platform (Vercel). Behind another proxy, make sure it overwrites these headers. */
export const clientIp = (request: NextRequest) =>
  request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
