import { Briefcase } from "lucide-react";
import type { Locale, TimelineEntry } from "@/types";
import { HexIcon } from "./HexIcon";
import { Reveal } from "./Reveal";

export function Timeline({ entries, lang }: { entries: TimelineEntry[]; lang: Locale }) {
  return (
    <ol className="relative ml-5 border-l border-neon/40">
      {entries.map((entry, i) => (
        <li key={entry.id} className="relative pb-14 pl-10 last:pb-0">
          <HexIcon className="absolute -left-[22px] -top-1"><Briefcase size={16} /></HexIcon>
          <Reveal delay={i * 0.06} className="grid gap-5">
            <div>
              <h3 className="text-2xl font-semibold">{entry.org}</h3>
              <p className="mt-2 text-neon">{entry.title[lang]}</p>
              {entry.period && <p className="mt-2 font-mono text-sm text-dim">{entry.period[lang]}</p>}
            </div>
            <ul className="panel px-6 py-2">
              {entry.points.map((point) => <li key={point.en} className="border-b border-line py-3 last:border-0 text-[#c3d4ca]">{point[lang]}</li>)}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
