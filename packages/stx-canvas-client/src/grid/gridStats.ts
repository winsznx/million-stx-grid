import type { GridState } from "../types";

/** Returns a map of color -> count across the grid. */
export function getColorDistribution(grid: GridState): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const { color } of grid.values()) {
    counts.set(color, (counts.get(color) ?? 0) + 1);
  }
  return counts;
}

/** Returns a map of painter -> count across the grid. */
export function getPainterDistribution(grid: GridState): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const { painter } of grid.values()) {
    counts.set(painter, (counts.get(painter) ?? 0) + 1);
  }
  return counts;
}

/** Computes the percentage of cells that are painted. */
export function getGridFillRate(grid: GridState, gridSize: number): number {
  if (gridSize <= 0) return 0;
  return grid.size / (gridSize * gridSize);
}
