import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { experience } from "@/data/experience";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Experience({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section
      id="experience" art="experience"
      heading={<SectionHeading id="experience" index="04" label={dict.experience.label} heading={dict.experience.heading} />}
    >
      <Timeline entries={experience} lang={lang} />
    </Section>
  );
}
