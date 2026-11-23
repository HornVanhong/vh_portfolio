import { ExternalLink as ExternalIcon } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Project } from "@/types";
import { GithubIcon } from "./BrandIcons";
import { ExternalLink } from "./ExternalLink";

export function ProjectLinks({ project, dict }: { project: Project; dict: Dictionary }) {
  const { pending, newTab } = dict.common;
  return (
    <div className="flex flex-wrap gap-x-6">
      <ExternalLink href={project.github} icon={<GithubIcon />} label={dict.projects.github} pending={pending} newTab={newTab} />
      <ExternalLink href={project.demo} icon={<ExternalIcon size={18} aria-hidden />} label={dict.projects.demo} pending={pending} newTab={newTab} />
    </div>
  );
}
