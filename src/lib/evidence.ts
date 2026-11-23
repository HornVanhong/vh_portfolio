import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { localePath, sectionHref } from "@/lib/utils";
import type { Locale } from "@/types";

export interface Evidence {
  kind: "project" | "training" | "experience";
  label: string;
  href: string;
}

/** Everything in the portfolio data that names the given skill. */
export function evidenceFor(skill: string, lang: Locale): Evidence[] {
  return [
    ...projects
      .filter((p) => p.stack.includes(skill))
      .map((p) => ({ kind: "project" as const, label: p.title, href: localePath(lang, `/projects/${p.slug}`) })),
    ...education
      .filter((e) => e.skills.includes(skill))
      .map((e) => ({ kind: "training" as const, label: e.org, href: sectionHref(lang, "education") })),
    ...experience
      .filter((e) => e.skills.includes(skill))
      .map((e) => ({ kind: "experience" as const, label: e.org, href: sectionHref(lang, "experience") })),
  ];
}
