"use client";
import dynamic from "next/dynamic";
import { useWideScreen } from "@/hooks/useWideScreen";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMatrix } from "@/lib/matrix-store";

const MatrixCanvas = dynamic(() => import("./MatrixCanvas"), { ssr: false });

export function MatrixBackground() {
  const enabled = useMatrix();
  const reduced = useReducedMotion();
  const wide = useWideScreen();
  return enabled && !reduced && wide ? <MatrixCanvas /> : null;
}
