import { GridState } from "../types";

export function getColorDistribution(grid: GridState): Map<string, number> {
  const counts = new Map<string, number>();
  for (const { color } of grid.values()) {
    counts.set(color, (counts.get(color) ?? 0) + 1);
  }
  return counts;
}

export function getPainterDistribution(grid: GridState): Map<string, number> {
  const counts = new Map<string, number>();
  for (const { painter } of grid.values()) {
    counts.set(painter, (counts.get(painter) ?? 0) + 1);
  }
  return counts;
}

export function getGridFillRate(grid: GridState, gridSize: number): number {
  return grid.size / (gridSize * gridSize);
}
