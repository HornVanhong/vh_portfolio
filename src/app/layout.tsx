import type { Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Kantumruy_Pro } from "next/font/google";
import { headers } from "next/headers";
import { BootOnce } from "@/components/layout/BootOnce";
import { isLocale } from "@/i18n";
import "./globals.css";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-chakra" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Only fetched when Khmer glyphs are on the page.
const khmer = Kantumruy_Pro({ subsets: ["khmer"], variable: "--font-khmer", preload: false });

export const viewport: Viewport = { themeColor: "#050807", colorScheme: "dark" };

/**
 * The single root layout. It sits above app/[lang] so switching language is a
 * client-side navigation: Next.js does a full page load whenever the root layout's params change.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Set by src/proxy.ts; <HtmlLang> keeps it in sync after client-side language switches.
  const locale = (await headers()).get("x-locale") ?? "en";

  return (
    <html
      lang={isLocale(locale) ? locale : "en"}
      data-scroll-behavior="smooth"
      className={`${chakra.variable} ${jetbrains.variable} ${inter.variable} ${khmer.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <BootOnce />
        {children}
      </body>
    </html>
  );
}
