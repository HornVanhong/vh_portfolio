import Image from "next/image";
import type { Dictionary } from "@/i18n";

/** A staged animation, labelled as a simulation. Addresses are from the documentation range (RFC 5737). */
export function HackingSession({ t }: { t: Dictionary["hero"] }) {
  const s = t.session;
  return (
    <div className="cut relative grid grid-cols-1 gap-3 overflow-hidden px-5 py-4 font-mono text-xs sm:grid-cols-[auto_1fr]">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-3 font-display text-base font-semibold text-neon">
          [ {s.title} ]
          <span className="border border-cyan/60 px-1.5 font-mono text-[0.6875rem] font-normal text-cyan">{s.tag}</span>
        </p>
        <ul className="mt-2 text-[#7dffbf]">
          {s.lines.map((line, i) => (
            <li key={line} className="line-in leading-relaxed" style={{ animationDelay: `${1.2 + i * 0.55}s` }}>[+] {line}</li>
          ))}
        </ul>
      </div>
      <div aria-hidden className="relative hidden min-h-28 sm:block xl:hidden 2xl:block">
        <Image src="/images/art/world-map.webp" alt="" fill sizes="18rem" className="object-contain opacity-90" />
      </div>
    </div>
  );
}
