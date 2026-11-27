import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { getDictionary, isLocale } from "@/i18n";
import { siteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return { metadataBase: new URL(siteUrl), title: meta.title, description: meta.description };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  // Render per request so Next.js can attach the CSP nonce from src/proxy.ts.
  await connection();
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <HtmlLang lang={lang} />
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 bg-neon px-4 py-2 font-mono text-sm font-bold text-bg focus:translate-y-0"
      >
        {getDictionary(lang).common.skip}
      </a>
      <MotionProvider>{children}</MotionProvider>
    </>
  );
}
