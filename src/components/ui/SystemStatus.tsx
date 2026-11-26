import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";

const bars = [4, 6, 5, 9, 12, 10, 18, 14, 26, 40, 30, 22, 34, 28, 44, 38, 52, 60, 46];

export function SystemStatus({ lang, t }: { lang: Locale; t: Dictionary["hero"] }) {
  const s = t.status;
  const rows = [
    [s.location, profile.location[lang]],
    [s.focus, s.focusValue],
    [s.interest, s.interestValue],
  ] as const;
  return (
    <aside aria-label={s.title} className="cut p-5 font-mono text-sm">
      <p className="font-display text-base font-semibold text-neon">{s.title}</p>
      {profile.openToOpportunities && (
        <p className="mt-2 flex items-center gap-2 text-neon"><span aria-hidden className="ping size-2.5 rounded-full bg-neon shadow-[0_0_10px_#00ff88]" /> {s.open}</p>
      )}
      <dl className="mt-2">
        {rows.map(([key, value]) => (
          <div key={key} className="flex gap-2 py-0.5">
            <dt className="w-20 shrink-0 text-green">{key}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <svg aria-hidden viewBox="0 0 280 62" className="mt-2 w-full">
        <path d="M0 61.5h280" stroke="#00cc66" opacity=".5" />
        <path d="M0 34h58M0 42h84M0 50h40" stroke="#00ff88" strokeWidth="3" opacity=".7" />
        {bars.map((h, i) => <rect key={i} x={112 + i * 9} y={61 - h} width="4" height={h} fill="#00ff88" opacity=".85" className="eq-bar" style={{ animationDelay: `${(i * 137) % 900}ms` }} />)}
      </svg>
    </aside>
  );
}
