import type { Locale } from "@/types";

export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/** Public URL for a path in the given language. English has no prefix. */
export function localePath(lang: Locale, path = ""): string {
  return `${lang === "en" ? "" : `/${lang}`}${path}` || "/";
}

export const sectionHref = (lang: Locale, id: string) => `${localePath(lang)}#${id}`;

export const pad = (n: number) => String(n).padStart(2, "0");

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const siteUrl = rawSiteUrl.replace(/\/$/, "");
