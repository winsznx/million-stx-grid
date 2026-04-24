"use client";

import { useState, useCallback } from "react";
import { ZOOM_LEVELS, DEFAULT_ZOOM } from "@/lib/constants";

/**
 * Hook for managing canvas zoom state.
 */
export function useZoom() {
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);

  const zoomIn = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev as any);
      if (idx < ZOOM_LEVELS.length - 1) return ZOOM_LEVELS[idx + 1];
      return prev;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev as any);
      if (idx > 0) return ZOOM_LEVELS[idx - 1];
      return prev;
    });
  }, []);

  const resetZoom = useCallback(() => setZoom(DEFAULT_ZOOM), []);

  return { zoom, zoomIn, zoomOut, resetZoom };
}
