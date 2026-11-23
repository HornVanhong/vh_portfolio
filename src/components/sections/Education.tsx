import { GraduationCap } from "lucide-react";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { HexIcon } from "@/components/ui/HexIcon";
import { OrgLogo } from "@/components/ui/OrgLogo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Education({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section
      id="education" art="education"
      heading={<SectionHeading id="education" index="05" label={dict.education.label} heading={dict.education.heading} />}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((entry, i) => (
          <Reveal key={entry.id} delay={(i % 2) * 0.08}>
            <GlowingCard className="h-full p-6 md:p-7">
              <div className="mb-5">
                {entry.logo ? <OrgLogo src={entry.logo} /> : <HexIcon><GraduationCap size={18} /></HexIcon>}
              </div>
              <h3 className="text-xl font-semibold">{entry.org}</h3>
              <p className="mt-2 text-neon">{entry.title[lang]}</p>
              {entry.period && <p className="mt-2 font-mono text-sm text-dim">{entry.period[lang]}</p>}
              {entry.points.length > 0 && (
                <ul className="mt-6 space-y-2 text-[#b9cbc0]">
                  {entry.points.map((point) => <li key={point.en} className="flex gap-3"><span aria-hidden className="text-green">+</span>{point[lang]}</li>)}
                </ul>
              )}
            </GlowingCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
