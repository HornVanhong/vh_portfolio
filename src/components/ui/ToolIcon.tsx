import Image from "next/image";
import { toolIcons } from "@/data/tools";
import { cn } from "@/lib/utils";

/** The product's mark, or nothing for techniques and concepts. Decorative: the name is always beside it. */
export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const src = toolIcons[name];
  if (!src) return null;
  // Already 96px WebP files of a few kilobytes, so there is nothing to optimize.
  return <Image src={src} alt="" width={96} height={96} unoptimized className={cn("size-6 shrink-0 object-contain", className)} />;
}
