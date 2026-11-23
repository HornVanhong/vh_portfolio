import { Crosshair, Radar } from "lucide-react";
import { HexIcon } from "@/components/ui/HexIcon";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.about;
  return (
    <Section
      id="about" art="about"
      heading={<SectionHeading id="about" index="01" label={t.label} heading={t.heading} />}
    >
      <div className="grid gap-10">
        <Reveal className="order-last grid gap-5 sm:grid-cols-[16rem_1fr]">
          <Portrait dict={dict} className="aspect-[4/5]" />
          <dl className="panel content-center p-6 font-mono text-sm sm:grid">
            {[
              [t.basedIn, profile.location[lang]],
              [t.goalPrimary, t.goalPrimaryValue],
              [t.goalSecondary, t.goalSecondaryValue],
            ].map(([key, value]) => (
              <div key={key} className="flex flex-wrap justify-between gap-x-4 py-1.5">
                <dt className="text-dim">{key}</dt>
                <dd className="text-neon">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="space-y-12">
          <Reveal className="max-w-2xl space-y-5 text-lg text-[#c3d4ca]">
            {t.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <Reveal>
            <h3 className="text-xl font-semibold">{t.interests}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">{t.interestList.map((i) => <li key={i} className="tag">{i}</li>)}</ul>
          </Reveal>
          <Reveal>
            <h3 className="text-xl font-semibold">{t.goals}</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="panel flex flex-wrap items-center gap-x-4 p-5"><dt className="flex items-center gap-4 text-sm text-dim"><HexIcon solid><Crosshair size={18} /></HexIcon>{t.goalPrimary}</dt><dd className="mt-1 font-display text-xl font-semibold text-neon">{t.goalPrimaryValue}</dd></div>
              <div className="panel flex flex-wrap items-center gap-x-4 p-5"><dt className="flex items-center gap-4 text-sm text-dim"><HexIcon><Radar size={18} /></HexIcon>{t.goalSecondary}</dt><dd className="mt-1 font-display text-xl font-semibold">{t.goalSecondaryValue}</dd></div>
            </dl>
          </Reveal>
          <Reveal>
            <h3 className="text-xl font-semibold">{t.training}</h3>
            <ul className="mt-4 border-t border-line">
              {education.map((e) => (
                <li key={e.id} className="flex flex-wrap justify-between gap-x-6 border-b border-line py-3"><span>{e.org}</span><span className="text-dim">{e.title[lang]}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
