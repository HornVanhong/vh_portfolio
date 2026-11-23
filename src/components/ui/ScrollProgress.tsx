"use client";
import { m, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <m.div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-neon" style={{ scaleX: scrollYProgress }} />;
}
