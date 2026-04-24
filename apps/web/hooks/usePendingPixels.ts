"use client";

import { useState, useCallback } from "react";

/**
 * Hook for managing locally pending pixels that haven't been confirmed on-chain yet.
 */
export function usePendingPixels() {
  const [pending, setPending] = useState<Map<string, string>>(new Map());

  const addPending = useCallback((x: number, y: number, color: string) => {
    setPending((prev) => {
      const next = new Map(prev);
      next.set(`${x},${y}`, color);
      return next;
    });
  }, []);

  const clearPending = useCallback(() => setPending(new Map()), []);

  const removePending = useCallback((x: number, y: number) => {
    setPending((prev) => {
      const next = new Map(prev);
      next.delete(`${x},${y}`);
      return next;
    });
  }, []);

  return { pending, addPending, clearPending, removePending };
}
