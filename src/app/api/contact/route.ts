import { NextResponse, type NextRequest } from "next/server";
import { allowRequest } from "@/lib/rate-limit";
import { contactRequestSchema } from "@/lib/validation";

const MAX_BODY_BYTES = 32_000;
const MIN_ELAPSED_MS = 1500;

const reply = (status: number, code: string) =>
  NextResponse.json({ code }, { status, headers: { "Cache-Control": "no-store" } });

/** Reads at most MAX_BODY_BYTES, so a missing or false Content-Length cannot bypass the cap. */
async function readBody(request: NextRequest): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return reply(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "invalid");

  // Set by the platform (Vercel). Behind another proxy, make sure it overwrites these headers.
  const ip =
    request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allowRequest(ip))) return reply(429, "limited");

  const body = await readBody(request);
  if (body === null) return reply(413, "invalid");

  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return reply(400, "invalid");
  }
  const parsed = contactRequestSchema.safeParse(json);
  if (!parsed.success) return reply(400, "invalid");

  const { name, email, subject, message, website, elapsed } = parsed.data;
  // Bots get an ordinary success so they learn nothing.
  if (website || elapsed < MIN_ELAPSED_MS) return reply(200, "sent");

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return reply(503, "unavailable");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        // Plain text only: nothing a visitor types is ever rendered as HTML.
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] email provider returned", response.status);
      return reply(502, "failed");
    }
  } catch {
    console.error("[contact] email provider unreachable");
    return reply(502, "failed");
  }
  return reply(200, "sent");
}
