import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, reservedProjectSlots } from "@/data/projects";
import type { Dictionary } from "@/i18n";
import { pad } from "@/lib/utils";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.projects;
  return (
    <Section
      id="projects" art="projects" layout="top"
      heading={<SectionHeading id="projects" index="03" label={t.label} heading={t.heading} />}
    >
      <ProjectGrid
        labels={{ filter: t.filter, all: t.all, showing: t.showing, filters: t.filters }}
        items={projects.map((p) => ({ slug: p.slug, filters: p.filters, card: <ProjectCard project={p} lang={lang} dict={dict} /> }))}
        slots={Array.from({ length: reservedProjectSlots }, (_, i) => (
          <div key={i} className="flex flex-wrap items-center gap-x-8 gap-y-1 border border-dashed border-moss p-6 text-dim lg:col-span-2 md:p-8">
            <span aria-hidden className="font-mono text-green">{pad(projects.length + i + 1)}</span>
            <span className="font-display text-lg text-ink">{t.slot}</span>
            <span>{t.slotText}</span>
          </div>
        ))}
      />
    </Section>
  );
}
