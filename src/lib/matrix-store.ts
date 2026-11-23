"use client";
import { useSyncExternalStore } from "react";

const KEY = "vh-matrix";
let enabled = true;
let loaded = false;
const listeners = new Set<() => void>();

function read() {
  if (!loaded) {
    loaded = true;
    try {
      enabled = localStorage.getItem(KEY) !== "off";
    } catch {
      // Storage blocked: keep the default.
    }
  }
  return enabled;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setMatrix(next: boolean) {
  enabled = next;
  loaded = true;
  try {
    localStorage.setItem(KEY, next ? "on" : "off");
  } catch {
    // The preference will not persist.
  }
  listeners.forEach((l) => l());
}

export const useMatrix = () => useSyncExternalStore(subscribe, read, () => true);
