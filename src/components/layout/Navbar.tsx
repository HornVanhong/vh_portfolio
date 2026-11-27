"use client";
import Image from "next/image";
import { CvPreview } from "@/components/ui/CvPreview";
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

/** The notched outline behind the menu. */
function HeaderLines() {
  return (
    <svg aria-hidden viewBox="0 0 1600 64" preserveAspectRatio="none" className="absolute inset-0 hidden size-full text-neon opacity-60 min-[1500px]:block">
      <path d="M0 63h300M310 0l58 63h852l58-63M330 0l26 28M1290 63h310" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Navbar({ lang, path, common, t }: Props) {
  const active = useActiveSection(ids, path === "") ?? (path === "" ? "home" : "projects");

  return (
    <>
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <HeaderLines />
      <div className="relative mx-auto max-w-[112rem] px-5 md:px-9 flex h-16 items-center justify-between gap-2 sm:gap-5">
        <a href={sectionHref(lang, "home")} className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-display text-lg font-bold text-ink"><Image src="/images/art/shield.webp" alt="" width={124} height={144} unoptimized loading="eager" className="hidden h-11 w-auto min-[360px]:block" /><span className="text-sm text-neon sm:text-lg">{profile.brand}</span></a>

        <nav aria-label={t.primary} className="hidden xl:block">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={sectionHref(lang, item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative flex h-16 items-center px-3 font-display text-[0.9375rem] font-medium transition-colors -outline-offset-4 after:absolute after:inset-x-2 after:bottom-3 after:h-0.5 min-[1500px]:px-4",
                    active === item.id ? "text-neon after:bg-neon after:shadow-[0_0_12px_#00ff88]" : "text-ink hover:text-neon",
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
            <span className="hidden items-center gap-2 text-xs text-dim min-[1700px]:inline-flex">
              <span aria-hidden className="size-2 bg-neon" /> {common.available}
            </span>
          )}
          <LanguageSwitch lang={lang} path={path} label={common.language} section={path === "" ? active : null} />
          <CvPreview common={common} className="btn-neon hidden min-h-10 md:inline-flex" iconSize={15} />
          <MobileMenu lang={lang} active={active} common={common} t={t} />
        </div>
      </div>
      <ScrollProgress />
    </header>
    <SideRail lang={lang} active={active} label={t.rail} />
    </>
  );
}
