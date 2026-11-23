import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { projects } from "@/data/projects";
import { getDictionary, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { localePath, pad, sectionHref } from "@/lib/utils";

type Props = PageProps<"/[lang]/projects/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(lang) || !project) return {};
  return pageMetadata(lang, `/projects/${slug}`, `${project.title} — Horn Vanhong`, project.description[lang]);
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!isLocale(lang) || !project) notFound();

  const dict = getDictionary(lang);
  const t = dict.projects;
  const next = projects[(index + 1) % projects.length];

  return (
    <SiteShell lang={lang} dict={dict} path={`/projects/${slug}`}>
      <article className="wrap pb-24 pt-28 md:pt-36">
        <a href={sectionHref(lang, "projects")} className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-dim hover:text-neon">
          <ArrowLeft size={16} aria-hidden /> {t.back}
        </a>
        <header className="mb-10 mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-sm text-neon">{project.category[lang]}</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">{project.title}</h1>
          </div>
          <p className="text-lg text-[#c3d4ca]">{project.description[lang]}</p>
        </header>

        <div className="panel aspect-video overflow-hidden lg:aspect-[21/9]">
          <ProjectThumbnail project={project} lang={lang} dict={dict} priority />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <h2 className="text-2xl font-semibold">{t.flow}</h2>
            <ol className="mt-6 border-t border-line">
              {project.flow.map((step, i) => (
                <li key={step.en} className="flex gap-6 border-b border-line py-5 text-lg">
                  <span className="font-mono text-sm leading-7 text-neon" aria-hidden>{pad(i + 1)}</span>
                  {step[lang]}
                </li>
              ))}
            </ol>
            {project.note && <p className="mt-6 border-l-2 border-cyan pl-4 text-dim">{project.note[lang]}</p>}
          </section>
          <aside className="space-y-9">
            <section>
              <h2 className="text-lg font-semibold">{t.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => <SkillBadge key={s}>{s}</SkillBadge>)}
              </ul>
            </section>
            {project.highlights.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold">{t.highlights}</h2>
                <ul className="mt-3 space-y-1.5 text-dim">
                  {project.highlights.map((h) => <li key={h.en}>{h[lang]}</li>)}
                </ul>
              </section>
            )}
            <section>
              <h2 className="text-lg font-semibold">{t.links}</h2>
              <div className="mt-3"><ProjectLinks project={project} dict={dict} /></div>
            </section>
          </aside>
        </div>

        {next && (
          <a href={localePath(lang, `/projects/${next.slug}`)} className="panel panel-hover mt-20 flex items-center justify-between gap-6 p-6 md:p-9">
            <span>
              <span className="block font-mono text-sm text-dim">{t.next}</span>
              <span className="mt-1 block font-display text-2xl font-semibold">{next.title}</span>
            </span>
            <ArrowRight className="shrink-0 text-neon" aria-hidden />
          </a>
        )}
      </article>
    </SiteShell>
  );
}
