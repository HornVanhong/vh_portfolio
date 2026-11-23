"use client";
import { m } from "framer-motion";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Bot, Bug, MonitorSmartphone, Network, Server, Shield, Wrench } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Evidence } from "@/lib/evidence";
import { cn } from "@/lib/utils";

import { HexIcon } from "./HexIcon";
import { ToolIcon } from "./ToolIcon";

const icons: Record<string, ReactNode> = {
  cybersecurity: <Bug size={18} />,
  tools: <Wrench size={18} />,
  ai: <Bot size={18} />,
  frontend: <MonitorSmartphone size={18} />,
  backend: <Server size={18} />,
  infrastructure: <Network size={18} />,
};

interface Props {
  t: Dictionary["skills"];
  categories: { id: string; title: string; skills: { name: string; evidence: Evidence[] }[] }[];
}

export function SkillExplorer({ t, categories }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = categories[index]!;
  const skill = category.skills.find((s) => s.name === selected);
  const hasEvidence = category.skills.some((s) => s.evidence.length > 0);

  const choose = (next: number) => {
    setIndex(next);
    setSelected(null);
  };

  function onKeyDown(event: KeyboardEvent) {
    const last = categories.length - 1;
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-6">
      <div role="tablist" aria-label={t.categories} onKeyDown={onKeyDown} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`skill-tab-${c.id}`}
            aria-selected={i === index}
            aria-controls="skill-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => choose(i)}
            className={cn(
              "flex min-h-16 items-center gap-3 rounded-lg border px-3 text-left font-display font-semibold transition-colors",
              i === index ? "border-neon bg-neon/10 text-neon shadow-[0_0_20px_rgba(0,255,136,.15)]" : "border-line bg-bg/70 text-[#b9cbc0] hover:border-green",
            )}
          >
            <HexIcon solid={i === index}>{icons[c.id] ?? <Shield size={18} />}</HexIcon>
            {c.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${category.id}`} tabIndex={0} className="panel flex min-h-[19rem] flex-col p-6 md:p-9">
        <m.ul key={category.id} initial="hidden" animate="show" transition={{ staggerChildren: 0.04 }} className="flex flex-wrap gap-3">
          {category.skills.map(({ name, evidence }) => (
            <m.li key={name} className="reveal max-w-full" variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              {evidence.length > 0 ? (
                <button
                  type="button"
                  aria-pressed={selected === name}
                  onClick={() => setSelected(selected === name ? null : name)}
                  className={cn("btn min-h-16 text-base", selected === name ? "border-neon bg-neon/10 text-neon" : "border-green/60")}
                >
                  <ToolIcon name={name} className="size-9" />
                  {name}
                  <span aria-hidden className="text-xs text-neon">{evidence.length}</span>
                  <span className="sr-only">, {evidence.length} {t.places}</span>
                </button>
              ) : (
                <span className="inline-flex min-h-16 items-center gap-2.5 rounded-[7px] border border-line bg-bg/60 px-4 py-2 font-display text-base font-medium text-[#c3d4ca]"><ToolIcon name={name} className="size-9" />{name}</span>
              )}
            </m.li>
          ))}
        </m.ul>
        <div aria-live="polite" className="mt-auto pt-9">
          {hasEvidence && <div className="border-t border-line pt-5">
            <p className="font-mono text-sm text-dim">{skill ? `${t.evidence}: ${skill.name}` : t.choose}</p>
            {skill && (
              <ul className="mt-2">
                {skill.evidence.map((e) => (
                  <li key={e.kind + e.label}>
                    <a href={e.href} className="group flex min-h-11 flex-wrap items-center gap-x-4">
                      <span className="w-24 shrink-0 font-mono text-xs text-neon">{t[e.kind]}</span>
                      <span className="underline decoration-moss underline-offset-4 group-hover:decoration-neon">{e.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}
