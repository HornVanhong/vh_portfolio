import Image from "next/image";
import { cn } from "@/lib/utils";

export type ArtName = "hero" | "about" | "skills" | "projects" | "experience" | "education" | "contact";

/** Decorative artwork that dissolves into the frame. The scanlines suit its enlarged source. */
export function SectionArt({ name, className, priority }: { name: ArtName; className?: string; priority?: boolean }) {
  return (
    <div aria-hidden className={cn("art pointer-events-none relative", className)}>
      <Image src={`/images/art/${name}.webp`} alt="" fill loading={priority ? "eager" : "lazy"} sizes="(min-width: 1024px) 45vw, 60vw" className="object-cover object-top" />
    </div>
  );
}
