"use client";
import { Download } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Dictionary } from "@/i18n";
import { cn, sectionHref } from "@/lib/utils";
import type { Locale } from "@/types";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { SideRail } from "./SideRail";

interface Props {
  lang: Locale;
  path: string;
  common: Dictionary["common"];
  t: Dictionary["nav"];
}

// "focus" has no nav item, but tracking it clears the highlight while it is in view.
const ids = [...navigation.map((n) => n.id), "focus"];

export function Navbar({ lang, path, common, t }: Props) {
  const active = useActiveSection(ids, path === "") ?? (path === "" ? "home" : "projects");

  return (
    <>
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <div className="wrap flex h-16 items-center justify-between gap-2 sm:gap-5">
        <a href={sectionHref(lang, "home")} className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-display text-lg font-bold text-ink"><span aria-hidden className="hidden size-8 min-[360px]:grid place-items-center rounded-[5px] bg-neon text-sm text-bg shadow-[0_0_18px_rgba(0,255,136,.45)]">VH</span><span className="text-sm text-neon sm:text-lg">{profile.brand}</span></a>

        <nav aria-label={t.primary} className="hidden xl:block">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={sectionHref(lang, item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "nav-pill flex min-h-9 items-center px-3.5 font-display text-sm font-semibold transition-colors -outline-offset-4",
                    active === item.id ? "bg-neon text-bg focus-visible:outline-bg" : "text-[#b9cbc0] hover:text-ink",
                  )}
                >
                  {item.label[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {profile.openToOpportunities && (
            <span className="hidden items-center gap-2 text-xs text-dim min-[1400px]:inline-flex">
              <span aria-hidden className="size-2 bg-neon" /> {common.available}
            </span>
          )}
          <LanguageSwitch lang={lang} path={path} label={common.language} section={path === "" ? active : null} />
          <a href={profile.cv} download className="btn hidden min-h-10 md:inline-flex"><Download size={15} aria-hidden /> {common.downloadCv}</a>
          <MobileMenu lang={lang} active={active} common={common} t={t} />
        </div>
      </div>
      <ScrollProgress />
    </header>
    <SideRail lang={lang} active={active} label={t.rail} />
    </>
  );
}
