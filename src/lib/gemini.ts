import "server-only";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse";
const DEFAULT_MODEL = "gemini-3.5-flash-lite";

/** Countries where Google's terms allow only paid Gemini services: EEA, Switzerland and the UK. */
const PAID_ONLY = new Set(
  "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO CH GB".split(" "),
);

export const isChatConfigured = () => Boolean(process.env.GEMINI_API_KEY);

export const isRegionAllowed = (country: string | null) =>
  process.env.GEMINI_PAID_TIER === "true" || !country || !PAID_ONLY.has(country.toUpperCase());

export async function requestReply(system: string, input: string, signal: AbortSignal): Promise<Response> {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GEMINI_API_KEY ?? "",
      "Content-Type": "application/json",
      "Api-Revision": "2026-05-20",
    },
    body: JSON.stringify({
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      system_instruction: system,
      input,
      stream: true,
      store: false,
      generation_config: { max_output_tokens: 1000, thinking_level: "minimal" },
    }),
    signal,
    cache: "no-store",
  });
}

/** Yields the answer text from the event stream, skipping thought events. Throws if there is none. */
export async function* replyText(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = "";
  let received = false;

  function* parse(lines: string[]) {
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      const event = JSON.parse(data) as { event_type?: string; delta?: { type?: string; text?: string } };
      if (event.event_type === "error") throw new Error("Gemini stream error");
      if (event.event_type === "step.delta" && event.delta?.type === "text" && event.delta.text) {
        received = true;
        yield event.delta.text;
      }
    }
  }

  for await (const chunk of body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";
    yield* parse(lines);
  }
  yield* parse([buffer + decoder.decode()]);
  if (!received) throw new Error("Empty Gemini reply");
}
