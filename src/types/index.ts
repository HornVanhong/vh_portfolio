export const LOCALES = ["en", "km"] as const;
export type Locale = (typeof LOCALES)[number];

/** A string available in every supported language. */
export type Localized = Record<Locale, string>;

export interface Profile {
  name: string;
  brand: string;
  location: Localized;
  /** Set to a file in /public/images, e.g. "/images/horn-vanhong.jpg". */
  photo: string | null;
  cv: string;
  /** Public contact email. Null shows a non-clickable pending label. */
  email: string | null;
  social: { github: string | null; linkedin: string | null };
  openToOpportunities: boolean;
  terminal: { key: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: Localized;
  skills: string[];
}

export const PROJECT_FILTERS = ["security", "ai", "web"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type ProjectArtName = "recon" | "scanner" | "classroom";

export interface Project {
  slug: string;
  title: string;
  category: Localized;
  filters: ProjectFilter[];
  description: Localized;
  stack: string[];
  /** Capability labels that are not technologies. */
  highlights: Localized[];
  /** Steps or workflows shown on the detail page. */
  flow: Localized[];
  note: Localized | null;
  /** Screenshot in /public/images. Null renders the illustrated thumbnail. */
  thumbnail: string | null;
  art: ProjectArtName;
  /** Null shows a non-clickable pending label. */
  github: string | null;
  demo: string | null;
}

export interface TimelineEntry {
  id: string;
  org: string;
  /** File in /public/images/logos, or null for an icon. */
  logo: string | null;
  title: Localized;
  /** Null until confirmed; nothing is displayed for null. */
  period: Localized | null;
  points: Localized[];
  /** Skill names (as in data/skills.ts) this entry supports. */
  skills: string[];
}

export interface FocusArea {
  id: "offensive" | "defensive" | "ai";
  title: Localized;
  points: Localized[];
}

export interface NavItem {
  id: "home" | "about" | "skills" | "projects" | "experience" | "education" | "contact";
  label: Localized;
}
