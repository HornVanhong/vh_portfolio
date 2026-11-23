import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SecurityFocus } from "@/components/sections/SecurityFocus";
import { Skills } from "@/components/sections/Skills";
import { getDictionary, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "", meta.title, meta.description);
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const props = { lang, dict: getDictionary(lang) };

  return (
    <SiteShell {...props} path="">
      <Hero {...props} />
      <About {...props} />
      <Skills {...props} />
      <Projects {...props} />
      <Experience {...props} />
      <Education {...props} />
      <Certificates {...props} />
      <SecurityFocus {...props} />
      <Contact {...props} />
    </SiteShell>
  );
}
