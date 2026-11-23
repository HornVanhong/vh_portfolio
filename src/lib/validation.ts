import { z } from "zod";

// No generated code: the Content-Security-Policy forbids eval.
z.config({ jitless: true });

/** Single-line fields reject control characters, which also blocks header injection. */
const singleLine = (min: number, max: number) =>
  z.string().trim().min(min).max(max).regex(/^[^\p{Cc}]*$/u);

/** Shared by the form and the API route. Error text is looked up by field in the dictionary. */
export const contactSchema = z.object({
  name: singleLine(2, 80),
  email: z.string().trim().max(254).pipe(z.email()),
  subject: singleLine(3, 120),
  message: z.string().trim().min(10).max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Request body: form fields plus two spam traps. */
export const contactRequestSchema = contactSchema.extend({
  /** Honeypot: people never see this field. */
  website: z.string().max(200).optional(),
  /** Milliseconds between showing the form and submitting it. */
  elapsed: z.number().nonnegative(),
});
