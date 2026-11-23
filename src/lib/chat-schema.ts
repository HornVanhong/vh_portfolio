import { z } from "zod";
import { LOCALES } from "@/types";

// No generated code: the Content-Security-Policy forbids eval.
z.config({ jitless: true });

export const MAX_QUESTION = 500;
/** Messages sent with each question, including it. */
export const MAX_HISTORY = 8;

const message = z.discriminatedUnion("role", [
  z.object({ role: z.literal("user"), text: z.string().trim().min(1).max(MAX_QUESTION) }),
  z.object({ role: z.literal("assistant"), text: z.string().trim().min(1).max(4000) }),
]);

export const chatSchema = z.object({
  lang: z.enum(LOCALES),
  messages: z.array(message).min(1).max(MAX_HISTORY).refine((list) => list.at(-1)?.role === "user"),
});

export type ChatMessage = z.infer<typeof message>;
