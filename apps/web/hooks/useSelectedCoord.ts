"use client";

import { useState, useCallback } from "react";

/**
 * Hook for tracking the currently selected coordinate on the grid.
 */
export function useSelectedCoord() {
  const [coord, setCoord] = useState<{ x: number; y: number } | null>(null);

  const select = useCallback((x: number, y: number) => {
    setCoord({ x, y });
  }, []);

  const clear = useCallback(() => setCoord(null), []);

  return { coord, select, clear };
}
