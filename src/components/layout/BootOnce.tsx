"use client";
import { useEffect } from "react";

/** Must match the key read by the inline script in app/layout.tsx. */
export const BOOT_KEY = "vh-booted";

/**
 * Lives in the root layout, which stays mounted across language switches.
 * Once the intro has finished it marks <html> as booted and remembers it for the
 * browser session, so refreshes and language switches skip the boot screen.
 * (The inline script in app/layout.tsx applies the class before first paint.)
 */
export function BootOnce() {
  useEffect(() => {
    if (document.documentElement.classList.contains("booted")) return;
    const id = window.setTimeout(() => {
      document.documentElement.classList.add("booted");
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // Storage blocked (private mode etc.): the intro simply plays again next load.
      }
    }, 3000);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
