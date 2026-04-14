import { useState, useCallback } from "react";

interface HoverState {
  x: number;
  y: number;
}

export function useHoverPixel() {
  const [hoverCoord, setHoverCoord] = useState<HoverState | null>(null);

  const handleHover = useCallback((x: number, y: number) => {
    setHoverCoord({ x, y });
  }, []);

  const clearHover = useCallback(() => {
    setHoverCoord(null);
  }, []);

  return { hoverCoord, handleHover, clearHover };
}
