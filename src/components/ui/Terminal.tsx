"use client";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { useWideScreen } from "@/hooks/useWideScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/i18n";
import { setMatrix } from "@/lib/matrix-store";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";

interface Props {
  lang: Locale;
  t: Dictionary["terminal"];
  identity: { key: string; value: string }[];
  skills: string[];
  projects: { slug: string; title: string }[];
  sections: string[];
  cv: string;
}

interface Entry {
  id: number;
  command: string;
  output: string[];
}

const PROMPT = "vh@lab:~$";
const INTRO = "cat identity.txt";
const MAX_ENTRIES = 30;

export function Terminal({ lang, t, identity, skills, projects, sections, cv }: Props) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [value, setValue] = useState("");
  const [recall, setRecall] = useState(0);
  const nextId = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useWideScreen();

  useEffect(() => {
    if (entries.length) scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [entries]);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  function run(command: string): string[] | "clear" {
    const [name = "", arg = ""] = command.toLowerCase().split(/\s+/);
    switch (name) {
      case "help":
        return [t.help];
      case "whoami":
        return identity.map((row) => `${row.key}: ${row.value}`);
      case "skills":
        return skills;
      case "projects":
        return projects.map((p) => `${p.slug}  ${p.title}`);
      case "open": {
        const project = projects.find((p) => p.slug === arg);
        if (!project) return [`${t.usage} open <${projects.map((p) => p.slug).join("|")}>`];
        window.location.assign(localePath(lang, `/projects/${project.slug}`));
        return [`${t.opening} ${project.title}`];
      }
      case "goto":
        if (!sections.includes(arg)) return [`${t.usage} goto <${sections.join("|")}>`];
        scrollToSection(arg);
        return [`${t.opening} #${arg}`];
      case "cv": {
        const link = document.createElement("a");
        link.href = cv;
        link.download = "";
        link.click();
        return [`${t.opening} ${cv}`];
      }
      case "lang":
        if (arg !== "en" && arg !== "km") return [`${t.usage} lang <en|km>`];
        window.location.assign(localePath(arg));
        return [`${t.opening} ${localePath(arg)}`];
      case "matrix":
        if (arg !== "on" && arg !== "off") return [`${t.usage} matrix <on|off>`];
        setMatrix(arg === "on");
        if (arg === "on" && !reduced && !wide) return [t.narrow];
        return arg === "on" && reduced ? [t.reduced] : [`${t.matrix} ${t[arg]}`];
      case "clear":
        return "clear";
      default:
        return [`${t.unknown} ${name}`, t.tryHelp];
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const command = value.trim();
    setValue("");
    setRecall(0);
    if (!command) return;
    const output = run(command);
    if (output === "clear") {
      setEntries([]);
      setShowIntro(false);
      return;
    }
    nextId.current += 1;
    const id = nextId.current;
    setEntries((list) => [...list, { id, command, output }].slice(-MAX_ENTRIES));
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const next = Math.min(entries.length, Math.max(0, recall + (event.key === "ArrowUp" ? 1 : -1)));
    setRecall(next);
    setValue(next === 0 ? "" : (entries[entries.length - next]?.command ?? ""));
  }

  return (
    <div role="group" aria-label={t.title} className="panel glass font-mono text-sm">
      <div aria-hidden className="flex justify-between border-b border-line px-4 py-2 text-xs text-dim">
        <span>vh@lab</span>
        <span>identity.txt</span>
      </div>
      <div ref={scroller} className="h-60 overflow-y-auto p-4" tabIndex={0} role="log" aria-label={t.title}>
        {showIntro && (
          <>
            <p>
              <span className="text-green">{PROMPT}</span>{" "}
              <span className="typing" style={{ "--chars": `${INTRO.length}ch`, "--steps": INTRO.length } as CSSProperties}>{INTRO}</span>
            </p>
            <dl className="my-2">
              {identity.map((row, i) => (
                <div key={row.key} className="line-in flex gap-3" style={{ animationDelay: `${1.5 + i * 0.14}s` }}>
                  <dt className="w-[9ch] shrink-0 text-dim">{row.key}:</dt>
                  <dd className="min-w-0 break-words text-neon">{row.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="mt-2">
            <p className="break-words"><span className="text-green">{PROMPT}</span> {entry.command}</p>
            {entry.output.map((line) => <p key={line} className="break-words text-[#b9cbc0]">{line}</p>)}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 focus-within:bg-neon/5">
        <label htmlFor="terminal-input" className="shrink-0 text-green">
          <span aria-hidden>{PROMPT}</span>
          <span className="sr-only">{t.input}</span>
        </label>
        {!value && <span aria-hidden className="cursor shrink-0" />}
        <input
          id="terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.hint}
          maxLength={80}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="min-h-12 w-full min-w-0 bg-transparent text-base text-ink placeholder:text-dim md:text-sm"
        />
      </form>
    </div>
  );
}
