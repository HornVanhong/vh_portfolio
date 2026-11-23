"use client";
import { SendHorizontal, Square, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import { MAX_HISTORY, MAX_QUESTION, type ChatMessage } from "@/lib/chat-schema";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type Message = ChatMessage & { id: number };
type ErrorKey = keyof Dictionary["chat"]["errors"];

interface Props {
  lang: Locale;
  t: Dictionary["chat"];
  open: boolean;
  onClose: () => void;
}

const isErrorKey = (code: unknown, t: Props["t"]): code is ErrorKey => typeof code === "string" && Object.hasOwn(t.errors, code);

export default function ChatPanel({ lang, t, open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(0);
  const abort = useRef<AbortController | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => () => abort.current?.abort(), []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, error]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const user: Message = { id: ++nextId.current, role: "user", text: question };
    const replyId = ++nextId.current;
    const history = [...messages, user];
    setMessages(history);
    setValue("");
    setError(null);
    setBusy(true);
    setAnnouncement(t.thinking);
    input.current?.focus();

    const controller = new AbortController();
    abort.current = controller;
    let reply = "";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: history.slice(-MAX_HISTORY).map(({ role, text: body }) => ({ role, text: body })) }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => ({}))) as { code?: unknown };
        setError(isErrorKey(data.code, t) ? data.code : "failed");
        setAnnouncement("");
        // Give the question back so it can be sent again.
        setMessages((list) => list.filter((m) => m.id !== user.id));
        setValue(question);
        return;
      }
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        reply += chunk;
        const message: Message = { id: replyId, role: "assistant", text: reply };
        setMessages([...history, message]);
      }
      // Announced once when complete; streaming words would be read out in fragments.
      setAnnouncement(reply);
    } catch {
      if (controller.signal.aborted) setAnnouncement("");
      else {
        setError(reply ? "interrupted" : "failed");
        setAnnouncement("");
      }
    } finally {
      if (abort.current === controller) {
        abort.current = null;
        setBusy(false);
      }
    }
  }

  function clear() {
    abort.current?.abort();
    abort.current = null;
    setBusy(false);
    setMessages([]);
    setError(null);
    setAnnouncement("");
    input.current?.focus();
  }

  function onInputKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter also confirms text composition (IME), which must not send.
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    void ask(value);
  }

  const waiting = busy && messages.at(-1)?.role === "user";

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-label={t.title}
      hidden={!open}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className={cn(
        "fixed inset-x-2 bottom-2 top-18 z-[55] flex-col overflow-hidden rounded-xl border border-neon/50 bg-[#040a07] shadow-[0_0_50px_rgba(0,255,136,.18)] sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[min(38rem,calc(100dvh-11rem))] sm:w-[25rem]",
        open && "flex",
      )}
    >
      <div className="flex items-center justify-between border-b border-line bg-neon/[0.06] py-1.5 pl-4 pr-1.5">
        <div>
          <p className="font-display font-semibold text-neon">{t.title}</p>
          <p className="text-xs text-dim">{t.subtitle}</p>
        </div>
        <div className="flex">
          {messages.length > 0 && (
            <button type="button" aria-label={t.clear} title={t.clear} onClick={clear} className="grid size-11 place-items-center text-dim hover:text-neon"><Trash2 size={17} aria-hidden /></button>
          )}
          <button type="button" aria-label={t.close} onClick={onClose} className="grid size-11 place-items-center text-dim hover:text-neon"><X size={20} aria-hidden /></button>
        </div>
      </div>

      <div ref={log} role="region" aria-label={t.conversation} tabIndex={0} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-[0.9375rem]">
        <p className="rounded-lg border border-line bg-neon/[0.04] p-3 text-[#c3d4ca]">{t.welcome}</p>
        {messages.length === 0 && (
          <ul className="grid gap-2" aria-label={t.suggestionsLabel}>
            {t.suggestions.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => void ask(s)} disabled={busy} className="min-h-11 w-full rounded-lg border border-neon/35 px-3 py-2 text-left text-sm text-neon transition-colors hover:bg-neon/10">{s}</button>
              </li>
            ))}
          </ul>
        )}
        {messages.map((m) => (
          <p
            key={m.id}
            className={cn(
              "w-fit max-w-[88%] whitespace-pre-wrap break-words rounded-lg px-3 py-2",
              m.role === "user" ? "ml-auto bg-neon text-bg" : "border border-line bg-raised text-ink",
            )}
          >
            <span className="sr-only">{m.role === "user" ? t.you : t.assistant}: </span>
            {m.text}
          </p>
        ))}
        {waiting && <p className="flex items-center gap-2 font-mono text-sm text-dim"><span aria-hidden className="cursor" /> {t.thinking}</p>}
        {error && <p role="alert" className="rounded-lg border border-danger/60 p-3 text-sm text-danger">{t.errors[error]}</p>}
      </div>
      <p aria-live="polite" className="sr-only">{announcement}</p>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void ask(value);
        }}
        className="border-t border-line p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={input}
            rows={2}
            value={value}
            maxLength={MAX_QUESTION}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            aria-label={t.placeholder}
            aria-describedby="chat-notice"
            placeholder={t.placeholder}
            className="field resize-none"
          />
          {busy ? (
            <button type="button" aria-label={t.stop} onClick={() => abort.current?.abort()} className="btn min-h-12 px-3.5"><Square size={17} aria-hidden /></button>
          ) : (
            <button type="submit" aria-label={t.send} disabled={!value.trim()} className="btn btn-primary min-h-12 px-3.5"><SendHorizontal size={18} aria-hidden /></button>
          )}
        </div>
        <p id="chat-notice" className="mt-2 text-xs text-dim">{t.notice}</p>
      </form>
    </div>
  );
}
