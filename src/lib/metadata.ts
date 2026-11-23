import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/types";

export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const url = localePath(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: localePath("en", path), km: localePath("km", path), "x-default": localePath("en", path) },
    },
    openGraph: {
      type: "website",
      siteName: profile.brand,
      title,
      description,
      url,
      locale: lang === "km" ? "km_KH" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
