"use client";
import { useEffect } from "react";

/**
 * Lives in the root layout, which stays mounted across language switches.
 * Once the intro has finished it marks <html> as booted, so a re-rendered
 * Hero does not play the boot screen again.
 */
export function BootOnce() {
  useEffect(() => {
    const id = window.setTimeout(() => document.documentElement.classList.add("booted"), 3000);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
