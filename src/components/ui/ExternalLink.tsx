import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string | null;
  icon: ReactNode;
  label: string;
  pending: string;
  newTab: string;
  className?: string;
}

/** A real link when a URL is configured, otherwise plain text (never a dead control). */
export function ExternalLink({ href, icon, label, pending, newTab, className }: Props) {
  const shared = cn("inline-flex min-h-11 items-center gap-2 font-mono text-sm", className);
  if (!href) {
    return (
      <span className={cn(shared, "text-dim")}>
        {icon} {label} <span className="text-xs">({pending})</span>
      </span>
    );
  }
  const mail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={cn(shared, "break-all transition-colors hover:text-neon")}
      {...(mail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {icon} {label}
      {!mail && <span className="sr-only">({newTab})</span>}
    </a>
  );
}
