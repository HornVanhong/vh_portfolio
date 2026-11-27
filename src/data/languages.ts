/** Spoken languages shown on the CV. `dots` is the 1–5 bar next to the level. */
export interface Language {
  name: string;
  level: string;
  dots: 1 | 2 | 3 | 4 | 5;
}

export const languages: Language[] = [
  { name: "Khmer", level: "Native", dots: 5 },
  { name: "English", level: "Intermediate", dots: 3 },
  { name: "Korean", level: "Basic", dots: 2 },
];
