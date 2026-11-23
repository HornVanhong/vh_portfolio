import Image from "next/image";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

/** Head-and-shoulders silhouette as a dot matrix, lit from the upper left. */
function silhouette(): [string, string, string] {
  const layers: [string, string, string] = ["", "", ""];
  const inside = (x: number, y: number) =>
    ((x - 50) / 16) ** 2 + ((y - 42) / 21) ** 2 < 1 ||
    (Math.abs(x - 50) < 8 && y > 55 && y < 78) ||
    ((x - 50) / 40) ** 2 + ((y - 118) / 46) ** 2 < 1;
  for (let y = 10; y < 124; y += 2.5) {
    for (let x = 6; x < 95; x += 2.5) {
      if (!inside(x, y)) continue;
      const light = 0.95 - (x - 34) / 62 - (y - 22) / 190 + 0.1 * Math.sin(x * 1.7 + y * 2.3);
      const size = Math.min(1.9, Math.max(0.55, light * 1.9));
      const layer = light > 0.72 ? 0 : light > 0.4 ? 1 : 2;
      layers[layer] += `M${x} ${y}h${size.toFixed(2)}v${size.toFixed(2)}h-${size.toFixed(2)}z`;
    }
  }
  return layers;
}

const [bright, mid, dark] = silhouette();

export function Portrait({ dict, className }: { dict: Dictionary; className?: string }) {
  return (
    <div className={cn("panel overflow-hidden", className)}>
      {profile.photo ? (
        <Image src={profile.photo} alt={dict.hero.portraitAlt} fill loading="lazy" sizes="(min-width: 768px) 20rem, 90vw" className="object-cover object-[50%_28%]" />
      ) : (
        <svg role="img" aria-label={dict.hero.portraitPlaceholder} viewBox="0 0 100 125" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 size-full">
          <path d="M50 4v116M4 42h92" stroke="#174b34" strokeWidth=".3" strokeDasharray="1 2" />
          <circle cx="50" cy="42" r="30" fill="none" stroke="#174b34" strokeWidth=".4" />
          <path d={dark} fill="#174b34" />
          <path d={mid} fill="#00cc66" opacity=".8" />
          <path d={bright} fill="#00ff88" />
        </svg>
      )}
      {profile.photo && <span aria-hidden className="absolute inset-0 bg-linear-to-t from-neon/25 via-transparent to-transparent" />}
      <span aria-hidden className="scan absolute inset-x-0 h-px bg-neon/60" />
    </div>
  );
}
