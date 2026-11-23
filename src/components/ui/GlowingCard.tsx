import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowingCard({ children, className, glass }: { children: ReactNode; className?: string; glass?: boolean }) {
  return <div className={cn("panel panel-hover", glass && "glass", className)}>{children}</div>;
}
