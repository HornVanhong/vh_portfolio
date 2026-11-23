"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 48rem)";

function subscribe(listener: () => void) {
  const media = matchMedia(QUERY);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

/** True from tablet width up; decorative canvas effects are skipped below it. */
export const useWideScreen = () =>
  useSyncExternalStore(subscribe, () => matchMedia(QUERY).matches, () => false);
