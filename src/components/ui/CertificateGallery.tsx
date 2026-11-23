"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { CERTIFICATE_CATEGORIES, type Certificate, type CertificateCategory } from "@/types";

type Item = Certificate & { dateLabel: string };

const PREVIEW_COUNT = 6;
const imageFor = (item: Item) => `/images/certificates/${item.id}.webp`;

export function CertificateGallery({ t, items }: { t: Dictionary["certificates"]; items: Item[] }) {
  const [filter, setFilter] = useState<CertificateCategory | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const grid = useRef<HTMLUListElement>(null);

  const matches = filter === "all" ? items : items.filter((c) => c.category === filter);
  const collapsed = filter === "all" && !expanded;
  const visible = collapsed ? matches.slice(0, PREVIEW_COUNT) : matches;
  const current = index === null ? undefined : visible[index];

  const step = (by: number) => setIndex((i) => (i === null ? i : (i + by + visible.length) % visible.length));

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  function showAll() {
    setExpanded(true);
    // The button disappears, so move focus to the first newly shown certificate.
    requestAnimationFrame(() => grid.current?.querySelectorAll("button")[PREVIEW_COUNT]?.focus({ preventScroll: true }));
  }

  return (
    <>
      <div role="group" aria-label={t.filter} className="mb-8 flex flex-wrap items-center gap-2">
        {(["all", ...CERTIFICATE_CATEGORIES] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn("btn min-h-11", filter === f && "border-neon bg-neon/10 text-neon")}
          >
            {f === "all" ? t.all : t.categories[f]}
          </button>
        ))}
        <p aria-live="polite" className="ml-auto font-mono text-sm text-dim">{t.showing} {visible.length} / {items.length}</p>
      </div>

      <ul ref={grid} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
              className="panel panel-hover flex h-full w-full flex-col text-left"
            >
              <span className="relative block aspect-[7/5] w-full overflow-hidden rounded-t-lg border-b border-line bg-[#0b1510]">
                <Image src={imageFor(item)} alt="" fill sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw" className="object-contain p-3" />
              </span>
              <span className="block p-5">
                <span className="block font-mono text-xs text-cyan">{t.kinds[item.kind]}</span>
                <span className="mt-2 block font-display text-lg font-semibold leading-snug">{item.title}</span>
                <span className="mt-2 block text-sm text-[#b9cbc0]">{item.issuer}</span>
                <span className="mt-1 block font-mono text-xs text-dim">{item.dateLabel}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {collapsed && matches.length > PREVIEW_COUNT && (
        <button type="button" onClick={showAll} className="btn mt-8 w-full sm:w-auto">{t.showAll} ({matches.length})</button>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="certificate-title"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[94dvh] w-[min(70rem,94vw)] max-w-none rounded-xl border border-neon/50 bg-surface text-ink backdrop:bg-black/85"
      >
        {current && (
          <div className="p-4 md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0" aria-live="polite">
                <h3 id="certificate-title" className="text-lg font-semibold md:text-2xl">{current.title}</h3>
                <p className="mt-1 text-sm text-[#b9cbc0]">{current.issuer}</p>
                <p className="font-mono text-xs text-dim">{t.kinds[current.kind]}, {current.dateLabel}</p>
              </div>
              <button type="button" aria-label={t.close} onClick={() => dialog.current?.close()} className="grid size-11 shrink-0 place-items-center text-neon"><X aria-hidden /></button>
            </div>
            <Image
              key={current.id}
              src={imageFor(current)}
              alt={`${t.imageAlt} ${current.title}, ${current.issuer}`}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1200px) 1070px, 90vw"
              className="mx-auto h-auto max-h-[66dvh] w-auto max-w-full"
            />
            {visible.length > 1 && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <button type="button" aria-label={t.previous} onClick={() => step(-1)} className="btn"><ChevronLeft size={18} aria-hidden /></button>
                <span className="font-mono text-sm text-dim">{(index ?? 0) + 1} / {visible.length}</span>
                <button type="button" aria-label={t.next} onClick={() => step(1)} className="btn"><ChevronRight size={18} aria-hidden /></button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
