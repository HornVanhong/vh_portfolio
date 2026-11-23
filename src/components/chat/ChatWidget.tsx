"use client";
import dynamic from "next/dynamic";
import { Bot, X } from "lucide-react";
import { useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";

// The conversation code is only downloaded when someone opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export function ChatWidget({ lang, t }: { lang: Locale; t: Dictionary["chat"] }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  return (
    <>
      {/* Stays mounted once used, so closing the panel keeps the conversation. */}
      {used && <ChatPanel lang={lang} t={t} open={open} onClose={close} />}
      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-controls={used ? "chat-panel" : undefined}
        aria-label={open ? t.close : t.open}
        onClick={() => {
          if (open) return close();
          setUsed(true);
          setOpen(true);
        }}
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-xl border border-neon bg-neon text-bg shadow-[0_0_28px_rgba(0,255,136,.45)] transition-colors hover:bg-[#5cffb3]"
      >
        {open ? <X aria-hidden /> : <Bot size={26} aria-hidden />}
      </button>
    </>
  );
}
