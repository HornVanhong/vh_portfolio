"use client";
import { useEffect } from "react";

const MAX_TILT = 6; // degrees

/**
 * Tracks the pointer over glowing panels: CSS draws a spotlight under it and tilts the card in 3D.
 * One delegated listener for the whole page; does nothing on touch screens.
 */
export function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let active: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>(".panel-hover") : null;
      if (active && active !== target) reset(active);
      active = target;
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        target.style.setProperty("--mx", `${e.clientX - r.left}px`);
        target.style.setProperty("--my", `${e.clientY - r.top}px`);
        if (reduced) return;
        // Wide cards tilt less so the far edge doesn't swing too much.
        const scale = Math.min(1, 520 / r.width);
        target.style.setProperty("--rx", `${((0.5 - py) * MAX_TILT * scale).toFixed(2)}deg`);
        target.style.setProperty("--ry", `${((px - 0.5) * MAX_TILT * scale).toFixed(2)}deg`);
      });
    };
    const onLeave = () => { if (active) reset(active); active = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
