import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { localePath } from "@/lib/utils";
import type { Locale, Project } from "@/types";
import { GlowingCard } from "./GlowingCard";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { SkillBadge } from "./SkillBadge";

export function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const t = dict.projects;
  return (
    <article className="@container h-full">
      <GlowingCard className="flex h-full flex-col @3xl:grid @3xl:grid-cols-[1.35fr_1fr]">
        <div className="aspect-video overflow-hidden rounded-t-lg border-b border-line @3xl:aspect-auto @3xl:min-h-[26rem] @3xl:border-b-0 @3xl:border-r">
          <ProjectThumbnail project={project} lang={lang} dict={dict} />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="font-mono text-xs text-neon">{project.category[lang]}</p>
          <h3 className="mt-3 text-2xl font-semibold @3xl:text-4xl">{project.title}</h3>
          <p className="mt-4 text-[#b9cbc0]">{project.description[lang]}</p>
          <ul className="mb-6 mt-5 flex flex-wrap gap-2" aria-label={t.stack}>
            {project.stack.map((s) => <SkillBadge key={s} name={s} />)}
            {project.highlights.map((h) => <SkillBadge key={h.en} name={h[lang]} />)}
          </ul>
          <div className="mt-auto">
            <ProjectLinks project={project} dict={dict} />
            <a href={localePath(lang, `/projects/${project.slug}`)} className="btn mt-4 w-full @sm:w-auto">
              {t.details} <span className="sr-only">: {project.title}</span> <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </GlowingCard>
    </article>
  );
}
