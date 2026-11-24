import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface Props {
  lang: Locale;
  dict: Dictionary;
  /** Path without the language prefix; "" for the home page. */
  path: string;
  children: ReactNode;
}

export function SiteShell({ lang, dict, path, children }: Props) {
  return (
    <>
      <Navbar lang={lang} path={path} common={dict.common} t={dict.nav} />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">{children}</main>
      <Footer lang={lang} dict={dict} />
      <ChatWidget lang={lang} t={dict.chat} />
    </>
  );
}
