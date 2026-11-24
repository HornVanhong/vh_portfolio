import { NextResponse, type NextRequest } from "next/server";
import { conversationInput, systemInstruction } from "@/lib/assistant";
import { chatSchema } from "@/lib/chat-schema";
import { isChatConfigured, isRegionAllowed, replyText, requestReply } from "@/lib/gemini";
import { allowRequest } from "@/lib/rate-limit";
import { clientIp, isSameOrigin, readBody } from "@/lib/request";

export const maxDuration = 30;

const MAX_BODY_BYTES = 64_000;
const DEFAULT_DAILY_LIMIT = 200;

const fail = (status: number, code: string) =>
  NextResponse.json({ code }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return fail(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail(415, "invalid");
  if (!isChatConfigured()) return fail(503, "unavailable");
  if (!isRegionAllowed(request.headers.get("x-vercel-ip-country"))) return fail(403, "region");
  if (!(await allowRequest(clientIp(request), { scope: "chat", limit: 12, windowSeconds: 600 }))) return fail(429, "limited");

  const body = await readBody(request, MAX_BODY_BYTES);
  if (body === null) return fail(413, "invalid");
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return fail(400, "invalid");
  }
  const parsed = chatSchema.safeParse(json);
  if (!parsed.success) return fail(400, "invalid");

  // Site-wide cap, counted only for valid questions: bounds cost however many addresses are used.
  const daily = Number(process.env.CHAT_DAILY_LIMIT) || DEFAULT_DAILY_LIMIT;
  if (!(await allowRequest("all", { scope: "chat-day", limit: daily, windowSeconds: 86_400 }))) return fail(429, "busy");

  const { lang, messages } = parsed.data;
  const abort = new AbortController();
  const signal = AbortSignal.any([request.signal, abort.signal, AbortSignal.timeout(25_000)]);

  try {
    const upstream = await requestReply(systemInstruction(lang), conversationInput(messages), signal);
    if (!upstream.ok || !upstream.body) {
      const err = await upstream.text().catch(() => "");
      console.error("[chat] Gemini returned", upstream.status, err);
      return fail(upstream.status === 429 ? 429 : 502, upstream.status === 429 ? "busy" : "failed");
    }

    const reply = replyText(upstream.body);
    // Wait for the first words so that early failures still get a proper status code.
    const first = await reply.next();
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
      },
      async pull(controller) {
        try {
          const { done, value } = await reply.next();
          if (done) controller.close();
          else controller.enqueue(encoder.encode(value));
        } catch {
          controller.error(new Error("Reply interrupted"));
        }
      },
      cancel() {
        abort.abort();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
    });
  } catch {
    if (!request.signal.aborted) console.error("[chat] Gemini request failed");
    return fail(502, "failed");
  }
}
