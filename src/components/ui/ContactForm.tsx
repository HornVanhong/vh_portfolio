"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Dictionary } from "@/i18n";
import { contactSchema, type ContactInput } from "@/lib/validation";

type Failure = "failed" | "network" | "limited" | "unavailable" | "invalid";

const FAILURE_BY_CODE: Record<string, Failure> = { limited: "limited", unavailable: "unavailable", invalid: "invalid" };

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });
  const [failure, setFailure] = useState<Failure | null>(null);
  const [sent, setSent] = useState(false);
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
    else startedAt.current = performance.now();
  }, [sent]);

  async function submit(values: ContactInput) {
    setFailure(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", elapsed: performance.now() - startedAt.current }),
      });
      if (response.ok) {
        reset();
        setSent(true);
        return;
      }
      const data = (await response.json().catch(() => ({}))) as { code?: string };
      setFailure(FAILURE_BY_CODE[data.code ?? ""] ?? "failed");
    } catch {
      setFailure("network");
    }
  }

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="panel grid min-h-80 content-center justify-items-start gap-6 p-8">
        <p className="font-display text-2xl font-semibold text-neon">{t.success}</p>
        <button type="button" className="btn" onClick={() => setSent(false)}>{t.another}</button>
      </div>
    );
  }

  const field = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    className: "field",
    "aria-required": true,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    ...register(name),
  });
  const error = (name: keyof ContactInput) =>
    errors[name] && <p id={`contact-${name}-error`} role="alert" className="mt-1.5 text-sm text-danger">{t.errors[name]}</p>;
  const label = (name: keyof ContactInput) => (
    <label htmlFor={`contact-${name}`} className="mb-1.5 block font-mono text-sm">{t[name]}</label>
  );

  return (
    // method="post" keeps typed details out of the URL if a submit happens before hydration.
    <form noValidate method="post" onSubmit={(event) => void handleSubmit(submit)(event)} className="panel grid gap-5 p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>{label("name")}<input type="text" autoComplete="name" maxLength={80} {...field("name")} />{error("name")}</div>
        <div>{label("email")}<input type="email" autoComplete="email" maxLength={254} {...field("email")} />{error("email")}</div>
      </div>
      <div>{label("subject")}<input type="text" maxLength={120} {...field("subject")} />{error("subject")}</div>
      <div>{label("message")}<textarea rows={6} maxLength={4000} {...field("message")} />{error("message")}</div>
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-sm text-dim">{t.privacy}</p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
          {isSubmitting ? <LoaderCircle size={17} className="animate-spin" aria-hidden /> : <Send size={17} aria-hidden />}
          {isSubmitting ? t.sending : t.send}
        </button>
        <p role="alert" className="text-sm text-danger">{failure && t[failure]}</p>
      </div>
    </form>
  );
}
