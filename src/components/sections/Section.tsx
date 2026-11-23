import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FrameOrnaments } from "@/components/ui/FrameOrnaments";
import { SectionArt, type ArtName } from "@/components/ui/SectionArt";

interface Props {
  id: string;
  heading: ReactNode;
  children: ReactNode;
  art?: ArtName;
  /** "side": art beside all content. "top": art beside the heading only. */
  layout?: "side" | "top";
}

/** One framed screen of the interface. */
export function Section({ id, heading, children, art, layout = "side" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="frame">
      <FrameOrnaments />
      <div className="wrap relative py-16 md:py-24">
        {art && layout === "side" ? (
          <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr]">
            <div className="relative z-10 min-w-0">
              {heading}
              {children}
            </div>
            <div className="relative -mx-5 hidden lg:-mr-10 lg:block">
              <SectionArt name={art} className={cn("sticky top-24 -ml-16", art === "contact" ? "h-[32rem]" : "h-[min(42rem,80vh)]")} />
            </div>
          </div>
        ) : (
          <>
            <div className="grid items-end lg:grid-cols-[1.45fr_1fr]">
              {heading}
              {art && <SectionArt name={art} className="-mt-10 mb-4 hidden h-72 lg:block" />}
            </div>
            {children}
          </>
        )}
      </div>
    </section>
  );
}
