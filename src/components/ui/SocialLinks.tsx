import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ExternalLink } from "./ExternalLink";

export function SocialLinks({ dict }: { dict: Dictionary }) {
  const { pending, newTab } = dict.common;
  return (
    <>
      <ExternalLink href={profile.social.github} icon={<GithubIcon />} label="GitHub" pending={pending} newTab={newTab} />
      <ExternalLink href={profile.social.linkedin} icon={<LinkedinIcon />} label="LinkedIn" pending={pending} newTab={newTab} />
    </>
  );
}
