import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { localePath, siteUrl } from "@/lib/utils";
import { LOCALES } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.flatMap((path) => {
    const languages = {
      en: siteUrl + localePath("en", path),
      km: siteUrl + localePath("km", path),
    };
    return LOCALES.map((lang) => ({ url: languages[lang], alternates: { languages } }));
  });
}
