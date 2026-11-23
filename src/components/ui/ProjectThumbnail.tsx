import Image from "next/image";
import type { Dictionary } from "@/i18n";
import type { Locale, Project } from "@/types";
import { ProjectArt } from "./ProjectArt";

interface Props {
  project: Project;
  lang: Locale;
  dict: Dictionary;
  priority?: boolean;
}

export function ProjectThumbnail({ project, dict, priority }: Props) {
  if (project.thumbnail) {
    return (
      <div className="relative size-full">
        <Image src={project.thumbnail} alt={`${dict.projects.thumbAlt} ${project.title}`} fill priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="relative size-full bg-[#020403]">
      <ProjectArt name={project.art} label={`${project.title}: ${dict.projects.illustration}`} />
      <span aria-hidden className="absolute left-2 top-1.5 bg-bg/80 px-1.5 font-mono text-[0.6875rem] text-dim">{dict.projects.illustration}</span>
    </div>
  );
}
