"use client";
import { useEffect } from "react";
import type { Locale } from "@/types";

/** Keeps <html lang> current when the language changes without a page load. */
export function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
