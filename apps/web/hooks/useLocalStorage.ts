"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Type-safe hook for persisting state in localStorage with SSR safety.
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
    }
  }, [key]);

  const write = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          } catch (e) {
            console.warn(`Error writing localStorage key "${key}":`, e);
          }
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, write];
}
