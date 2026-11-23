import type { ReactNode } from "react";

export function SkillBadge({ children }: { children: ReactNode }) {
  return <li className="tag">{children}</li>;
}
