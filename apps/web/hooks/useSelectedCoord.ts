import { useState, useCallback } from "react";

interface Coord {
  x: number;
  y: number;
}

export function useSelectedCoord() {
  const [selectedCoord, setSelectedCoord] = useState<Coord | null>(null);

  const selectCoord = useCallback((x: number, y: number) => {
    setSelectedCoord({ x, y });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCoord(null);
  }, []);

  return { selectedCoord, selectCoord, clearSelection };
}
