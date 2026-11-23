import { FolderGit2, GraduationCap, House, Mail, Swords, UserRound, BriefcaseBusiness, type LucideIcon } from "lucide-react";
import { navigation } from "@/data/navigation";
import { cn, sectionHref } from "@/lib/utils";
import type { Locale, NavItem } from "@/types";

const icons: Record<NavItem["id"], LucideIcon> = {
  home: House,
  about: UserRound,
  skills: Swords,
  projects: FolderGit2,
  experience: BriefcaseBusiness,
  education: GraduationCap,
  contact: Mail,
};

/** Icon rail on wide screens; the same destinations as the top navigation. */
export function SideRail({ lang, active, label }: { lang: Locale; active: string; label: string }) {
  return (
    <nav aria-label={label} className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="glass grid gap-1 rounded-lg border border-line p-1.5">
        {navigation.map((item) => {
          const Icon = icons[item.id];
          const on = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={sectionHref(lang, item.id)}
                aria-label={item.label[lang]}
                title={item.label[lang]}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "grid size-11 place-items-center rounded-md border transition-colors",
                  on ? "border-neon bg-neon/10 text-neon shadow-[0_0_16px_rgba(0,255,136,.25)]" : "border-transparent text-dim hover:border-line hover:text-neon",
                )}
              >
                <Icon size={18} aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
