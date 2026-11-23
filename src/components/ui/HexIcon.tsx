import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hexagon badge. Two clipped layers give the outline a real hexagonal edge. */
export function HexIcon({ children, solid, className }: { children: ReactNode; solid?: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn("hex grid size-11 shrink-0 place-items-center bg-neon p-[1.5px]", className)}>
      <span className={cn("hex grid size-full place-items-center", solid ? "bg-neon text-bg" : "bg-[#04140c] text-neon")}>{children}</span>
    </span>
  );
}
