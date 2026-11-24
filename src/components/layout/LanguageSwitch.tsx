import { cn, localePath } from "@/lib/utils";
import { LOCALES, type Locale } from "@/types";

const labels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  km: { short: "KH", name: "ភាសាខ្មែរ" },
  ko: { short: "KR", name: "한국어" },
};

interface Props {
  lang: Locale;
  path: string;
  label: string;
  /** Section to keep in view after switching. */
  section: string | null;
}

export function LanguageSwitch({ lang, path, label, section }: Props) {
  return (
    <nav aria-label={label} className="flex overflow-hidden rounded-lg border border-neon/50 font-mono text-xs">
      {LOCALES.map((l) => (
        // A full navigation, because <html lang> changes with the language.
        <a
          key={l}
          href={localePath(l, path) + (section && section !== "home" ? `#${section}` : "")}
          lang={l}
          hrefLang={l}
          aria-label={`${labels[l].short} – ${labels[l].name}`}
          aria-current={l === lang ? "true" : undefined}
          className={cn("grid h-10 min-w-9 sm:min-w-10 place-items-center", l === lang ? "bg-neon/15 text-neon" : "text-dim hover:text-ink")}
        >
          {labels[l].short}
        </a>
      ))}
    </nav>
  );
}
