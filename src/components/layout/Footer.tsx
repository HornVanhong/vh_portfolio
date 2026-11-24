import { ArrowUp } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Dictionary } from "@/i18n";
import { sectionHref } from "@/lib/utils";
import type { Locale } from "@/types";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="frame">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <p className="neon font-display text-2xl font-bold md:text-4xl">{profile.brand}</p>
          <p className="mt-4 font-mono text-dim"><span aria-hidden className="text-green">$ </span>{dict.footer.tagline} <span aria-hidden className="cursor" /></p>
        </div>
        <nav aria-label={dict.footer.navigate}>
          <ul className="grid grid-cols-2 gap-x-6">
            {navigation.map((item) => (
              <li key={item.id}><a href={sectionHref(lang, item.id)} className="inline-flex min-h-11 items-center text-dim hover:text-neon">{item.label[lang]}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col"><SocialLinks dict={dict} /></div>
      </div>
      <div className="wrap"><div className="flex items-center justify-between gap-4 border-t border-line pb-24 pt-5 text-sm text-dim">
        <p>© {new Date().getFullYear()} {profile.displayName[lang]}</p>
        <a href="#main" className="btn min-h-11"><ArrowUp size={16} aria-hidden /> {dict.common.backToTop}</a>
      </div></div>
    </footer>
  );
}
