"use client";
import { m } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PROJECT_FILTERS, type ProjectFilter } from "@/types";

interface Props {
  items: { slug: string; filters: ProjectFilter[]; card: ReactNode }[];
  slots: ReactNode;
  labels: { filter: string; all: string; showing: string; filters: Record<ProjectFilter, string> };
}

export function ProjectGrid({ items, slots, labels }: Props) {
  const [filter, setFilter] = useState<ProjectFilter | "all">("all");
  const visible = filter === "all" ? items : items.filter((i) => i.filters.includes(filter));

  return (
    <>
      <div role="group" aria-label={labels.filter} className="mb-8 flex flex-wrap items-center gap-2">
        {(["all", ...PROJECT_FILTERS] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn("btn min-h-11", filter === f && "border-neon bg-neon/10 text-neon")}
          >
            {f === "all" ? labels.all : labels.filters[f]}
          </button>
        ))}
        <p aria-live="polite" className="ml-auto font-mono text-sm text-dim">{labels.showing} {visible.length}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 lg:[&>*:first-child]:col-span-2">
        {visible.map((item, i) => (
          <m.div
            key={`${filter}-${item.slug}`}
            className="reveal min-w-0"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {item.card}
          </m.div>
        ))}
        {filter === "all" && slots}
      </div>
    </>
  );
}
