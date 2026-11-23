"use client";
import { Pause, Play } from "lucide-react";
import { useWideScreen } from "@/hooks/useWideScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { setMatrix, useMatrix } from "@/lib/matrix-store";

export function MatrixToggle({ on, off }: { on: string; off: string }) {
  const enabled = useMatrix();
  const reduced = useReducedMotion();
  const wide = useWideScreen();
  // The rain never runs with reduced motion or on phones, so there is nothing to control.
  if (reduced || !wide) return null;
  const label = enabled ? off : on;
  const Icon = enabled ? Pause : Play;
  return (
    <button type="button" onClick={() => setMatrix(!enabled)} aria-label={label} title={label} className="grid size-11 place-items-center text-dim transition-colors hover:text-neon">
      <Icon size={16} aria-hidden />
    </button>
  );
}
