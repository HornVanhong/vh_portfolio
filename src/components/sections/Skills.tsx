import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillExplorer } from "@/components/ui/SkillExplorer";
import { skillCategories } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import { evidenceFor } from "@/lib/evidence";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Skills({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.skills;
  return (
    <Section
      id="skills" art="skills"
      heading={<SectionHeading id="skills" index="02" label={t.label} heading={t.heading} intro={t.intro} />}
    >
      <Reveal>
        <SkillExplorer
          t={t}
          categories={skillCategories.map((c) => ({
            id: c.id,
            title: c.title[lang],
            skills: c.skills.map((name) => ({ name, evidence: evidenceFor(name, lang) })),
          }))}
        />
      </Reveal>
    </Section>
  );
}
