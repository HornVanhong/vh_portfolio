import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import { FacebookIcon, GithubIcon, LinkedinIcon, TelegramIcon, YoutubeIcon } from "./BrandIcons";
import { ExternalLink } from "./ExternalLink";

const links = [
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "telegram", label: "Telegram", Icon: TelegramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
] as const;

/** compact: square icon buttons. Links without a URL stay plain, non-clickable text. */
export function SocialLinks({ dict, compact }: { dict: Dictionary; compact?: boolean }) {
  const { pending, newTab } = dict.common;
  return links.map(({ key, label, Icon }) => {
    const href = profile.social[key];
    if (!compact) return <ExternalLink key={key} href={href} icon={<Icon />} label={label} pending={pending} newTab={newTab} />;
    const box = "grid size-11 place-items-center rounded-lg border";
    return href ? (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (${newTab})`} className={`${box} border-neon/50 bg-neon/5 text-neon hover:bg-neon/15`}><Icon /></a>
    ) : (
      <span key={key} title={`${label}: ${pending}`} className={`${box} border-line text-dim`}><Icon /><span className="sr-only">{label} ({pending})</span></span>
    );
  });
}
