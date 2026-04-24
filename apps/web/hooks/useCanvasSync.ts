"use client";

import { useEffect, useRef } from "react";

/**
 * Hook for syncing canvas state with external updates.
 */
export function useCanvasSync(onUpdate: () => void, interval = 15000) {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(onUpdate, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onUpdate, interval]);

  return { isSyncing: true };
}
