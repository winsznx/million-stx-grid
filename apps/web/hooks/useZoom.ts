import { useState, useCallback } from "react";
import { ZOOM_LEVELS, DEFAULT_ZOOM } from "@/lib/constants";

export function useZoom() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const zoomIn = useCallback(() => {
    setZoom((current) => {
      const idx = ZOOM_LEVELS.indexOf(current as (typeof ZOOM_LEVELS)[number]);
      if (idx < ZOOM_LEVELS.length - 1) return ZOOM_LEVELS[idx + 1];
      return current;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) => {
      const idx = ZOOM_LEVELS.indexOf(current as (typeof ZOOM_LEVELS)[number]);
      if (idx > 0) return ZOOM_LEVELS[idx - 1];
      return current;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
  }, []);

  return { zoom, setZoom, zoomIn, zoomOut, resetZoom };
}
