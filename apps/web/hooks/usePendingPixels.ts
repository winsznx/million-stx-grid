import { useState, useCallback } from "react";

interface PendingPixel {
  x: number;
  y: number;
  color: string;
}

export function usePendingPixels() {
  const [pendingPixels, setPendingPixels] = useState<PendingPixel[]>([]);

  const addPending = useCallback((pixel: PendingPixel) => {
    setPendingPixels((prev) => [...prev, pixel]);
  }, []);

  const removePending = useCallback((x: number, y: number) => {
    setPendingPixels((prev) =>
      prev.filter((p) => p.x !== x || p.y !== y)
    );
  }, []);

  const clearAll = useCallback(() => {
    setPendingPixels([]);
  }, []);

  return { pendingPixels, addPending, removePending, clearAll };
}
