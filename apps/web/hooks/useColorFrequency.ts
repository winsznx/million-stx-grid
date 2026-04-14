import { useMemo } from "react";
import type { GridState } from "@winsznx/stx-canvas-client";

interface ColorFrequency {
  color: string;
  count: number;
}

export function useColorFrequency(grid: GridState): ColorFrequency[] {
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const { color } of grid.values()) {
      counts.set(color, (counts.get(color) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([color, count]) => ({ color, count }))
      .sort((a, b) => b.count - a.count);
  }, [grid]);
}
