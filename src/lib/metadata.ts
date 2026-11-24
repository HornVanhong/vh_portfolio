import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { localePath } from "@/lib/utils";
import { LOCALES, type Locale } from "@/types";

const OG_LOCALES: Record<Locale, string> = { en: "en_US", km: "km_KH", ko: "ko_KR" };

export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const url = localePath(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])), "x-default": localePath("en", path) },
    },
    openGraph: {
      type: "website",
      siteName: profile.brand,
      title,
      description,
      url,
      locale: OG_LOCALES[lang],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
