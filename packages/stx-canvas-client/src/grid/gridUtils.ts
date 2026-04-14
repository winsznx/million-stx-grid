import { GridState } from "../types";
import { encodeCoord } from "./encodeCoord";

export function getGridDimensions(grid: GridState): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (const key of grid.keys()) {
    const [xStr, yStr] = key.split(",");
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return { minX, maxX, minY, maxY };
}

export function countFilledPixels(grid: GridState): number {
  return grid.size;
}

export function getPixelAt(grid: GridState, x: number, y: number): { color: string; painter: string } | undefined {
  return grid.get(encodeCoord(x, y));
}
