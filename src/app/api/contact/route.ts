import { NextResponse, type NextRequest } from "next/server";
import { allowRequest } from "@/lib/rate-limit";
import { clientIp, isSameOrigin, readBody } from "@/lib/request";
import { contactRequestSchema } from "@/lib/validation";

const MAX_BODY_BYTES = 32_000;
const MIN_ELAPSED_MS = 1500;

const reply = (status: number, code: string) =>
  NextResponse.json({ code }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return reply(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "invalid");

  if (!(await allowRequest(clientIp(request), { scope: "contact", limit: 5, windowSeconds: 600 }))) return reply(429, "limited");

  const body = await readBody(request, MAX_BODY_BYTES);
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
