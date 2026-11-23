"use client";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import { cn, sectionHref } from "@/lib/utils";
import type { Locale } from "@/types";

interface Props {
  lang: Locale;
  active: string;
  common: Dictionary["common"];
  t: Dictionary["nav"];
}

/** A native modal dialog: focus trapping, Escape and inert background come from the browser. */
export function MobileMenu({ lang, active, common, t }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => ref.current?.close();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Leave no open drawer behind when the desktop navigation takes over.
  useEffect(() => {
    const media = matchMedia("(min-width: 80rem)");
    const onChange = () => media.matches && ref.current?.close();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={t.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        className="grid size-11 place-items-center text-neon xl:hidden"
      >
        <Menu aria-hidden />
      </button>
      <dialog
        ref={ref}
        aria-label={t.menu}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none border-l border-line bg-surface text-ink backdrop:bg-black/70"
      >
        <div className="flex min-h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-neon">{profile.brand}</span>
            <button type="button" aria-label={t.close} onClick={close} className="grid size-11 place-items-center"><X aria-hidden /></button>
          </div>
          <nav aria-label={t.primary} className="my-6">
            <ul>
              {navigation.map((item) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={sectionHref(lang, item.id)}
                    onClick={() => {
                      // Unlock scrolling before the browser follows the anchor.
                      document.documentElement.style.overflow = "";
                      close();
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn("flex min-h-13 items-center font-display text-lg", active === item.id && "text-neon")}
                  >
                    {item.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-4">
            {profile.openToOpportunities && (
              <p className="flex items-center gap-2 text-sm text-dim"><span aria-hidden className="size-2 bg-neon" /> {common.available}</p>
            )}
            <a href={profile.cv} download className="btn btn-primary"><Download size={16} aria-hidden /> {common.downloadCv}</a>
          </div>
        </div>
      </dialog>
    </>
  );
}
