"use client";
import { useEffect, useRef } from "react";

// Khmer consonants and hex digits.
const GLYPHS = Array.from("កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភម0123456789ABCDEF");
const CELL = 20;
const FRAME_MS = 80;

export default function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let drops: number[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let onScreen = true;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      // Sparser on small screens.
      const gap = width < 768 ? CELL * 2 : CELL;
      drops = Array.from({ length: Math.ceil(width / gap) }, () => -Math.floor(Math.random() * (height / CELL) * 1.5));
    };

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (time - last < FRAME_MS) return;
      last = time;
      ctx.fillStyle = "rgba(5, 8, 7, 0.14)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00cc66";
      ctx.font = "14px monospace";
      const gap = width / drops.length;
      drops.forEach((y, i) => {
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!, i * gap, y * CELL);
        drops[i] = y * CELL > height && Math.random() > 0.97 ? -8 : y + 1;
      });
    };

    const update = () => {
      cancelAnimationFrame(frame);
      if (onScreen && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const sizes = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      update();
    });
    sizes.observe(canvas);
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", update);

    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full opacity-25" />;
}
