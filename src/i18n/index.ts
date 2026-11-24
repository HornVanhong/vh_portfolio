import { LOCALES, type Locale } from "@/types";
import { en, type Dictionary } from "./en";
import { km } from "./km";
import { ko } from "./ko";

const dictionaries: Record<Locale, Dictionary> = { en, km, ko };

export type { Dictionary };
export const getDictionary = (lang: Locale) => dictionaries[lang];
export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
