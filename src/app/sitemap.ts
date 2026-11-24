import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { localePath, siteUrl } from "@/lib/utils";
import { LOCALES } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, siteUrl + localePath(l, path)]));
    return LOCALES.map((lang) => ({ url: siteUrl + localePath(lang, path), alternates: { languages } }));
  });
}
