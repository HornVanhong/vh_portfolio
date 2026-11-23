import { ShieldCheck } from "lucide-react";
import { FocusArt } from "@/components/ui/FocusArt";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusAreas } from "@/data/focus";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function SecurityFocus({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.focus;
  return (
    <Section
      id="focus"
      heading={<SectionHeading id="focus" index="06" label={t.label} heading={t.heading} intro={t.intro} />}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {focusAreas.map((area, i) => (
          <Reveal key={area.id} delay={i * 0.08}>
            <GlowingCard className="h-full">
              <div className="overflow-hidden rounded-t-lg border-b border-line p-6"><FocusArt id={area.id} /></div>
              <div className="p-6 md:p-8">
                <p className="font-mono text-xs text-cyan">{t.badge}</p>
                <h3 className="mt-3 text-2xl font-semibold">{area.title[lang]}</h3>
                <ul className="mt-5 space-y-3 text-[#b9cbc0]">{area.points.map((p) => <li key={p.en} className="flex items-center gap-3"><HexIcon className="size-7"><ShieldCheck size={12} /></HexIcon>{p[lang]}</li>)}</ul>
              </div>
            </GlowingCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
