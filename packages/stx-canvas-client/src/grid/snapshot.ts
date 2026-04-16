import { GridState } from "../types";
import { decodeCoord } from "./encodeCoord";

export interface GridSnapshot {
  totalPixels: number;
  uniquePainters: number;
  uniqueColors: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function createGridSnapshot(grid: GridState): GridSnapshot {
  const painters = new Set<string>();
  const colors = new Set<string>();
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const [key, pixel] of grid) {
    painters.add(pixel.painter);
    colors.add(pixel.color);
    const { x, y } = decodeCoord(key);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return {
    totalPixels: grid.size,
    uniquePainters: painters.size,
    uniqueColors: colors.size,
    minX: Number.isFinite(minX) ? minX : 0,
    maxX: Number.isFinite(maxX) ? maxX : 0,
    minY: Number.isFinite(minY) ? minY : 0,
    maxY: Number.isFinite(maxY) ? maxY : 0,
  };
}
