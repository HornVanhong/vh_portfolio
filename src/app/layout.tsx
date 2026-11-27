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

/** Must match BOOT_KEY in <BootOnce>. Runs before first paint so a returning visitor never sees the intro flash. */
const BOOT_SCRIPT = `try{if(sessionStorage.getItem("vh-booted"))document.documentElement.classList.add("booted")}catch(e){}`;

export const viewport: Viewport = { themeColor: "#050807", colorScheme: "dark" };

/**
 * The single root layout. It sits above app/[lang] so switching language is a
 * client-side navigation: Next.js does a full page load whenever the root layout's params change.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Set by src/proxy.ts; <HtmlLang> keeps it in sync after client-side language switches.
  const h = await headers();
  const locale = h.get("x-locale") ?? "en";
  const nonce = h.get("x-nonce") ?? undefined;

  return (
    <html
      lang={isLocale(locale) ? locale : "en"}
      data-scroll-behavior="smooth"
      className={`${chakra.variable} ${jetbrains.variable} ${inter.variable} ${khmer.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
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
