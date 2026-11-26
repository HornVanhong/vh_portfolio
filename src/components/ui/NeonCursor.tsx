"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, summary, [role='button'], input, textarea, select, label";

/** A neon dot with a trailing ring that grows over clickable things. Mouse only. */
export function NeonCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !dot.current || !ring.current) return;

    const d = dot.current;
    const r = ring.current;
    document.documentElement.classList.add("has-neon-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, frame = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const hit = e.target instanceof Element && e.target.closest(INTERACTIVE);
      r.classList.toggle("is-hover", Boolean(hit));
      d.classList.add("is-on");
      r.classList.add("is-on");
    };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => r.classList.remove("is-down");
    const onLeave = () => { d.classList.remove("is-on"); r.classList.remove("is-on"); };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-neon-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="cursor-ring" />
      <div ref={dot} aria-hidden className="cursor-dot" />
    </>
  );
}
