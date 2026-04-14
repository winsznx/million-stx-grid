import { useMemo } from "react";
import type { GridState } from "@winsznx/stx-canvas-client";
import { GRID_SIZE } from "@/lib/constants";

interface GridStats {
  filledPixels: number;
  totalPixels: number;
  fillPercentage: number;
}

export function useGridStats(grid: GridState): GridStats {
  return useMemo(() => {
    const filledPixels = grid.size;
    const totalPixels = GRID_SIZE * GRID_SIZE;
    const fillPercentage = totalPixels > 0 ? (filledPixels / totalPixels) * 100 : 0;
    return { filledPixels, totalPixels, fillPercentage };
  }, [grid]);
}
