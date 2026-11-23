import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Kantumruy_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { getDictionary, isLocale } from "@/i18n";
import { siteUrl } from "@/lib/utils";
import "../globals.css";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-chakra" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Only fetched when Khmer glyphs are on the page.
const khmer = Kantumruy_Pro({ subsets: ["khmer"], variable: "--font-khmer", preload: false });

export const viewport: Viewport = { themeColor: "#050807", colorScheme: "dark" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return { metadataBase: new URL(siteUrl), title: meta.title, description: meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  // Render per request so Next.js can attach the CSP nonce from src/proxy.ts.
  await connection();
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${chakra.variable} ${jetbrains.variable} ${inter.variable} ${khmer.variable}`}
    >
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[60] -translate-y-24 bg-neon px-4 py-2 font-mono text-sm font-bold text-bg focus:translate-y-0"
        >
          {getDictionary(lang).common.skip}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
