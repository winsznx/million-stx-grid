import type { GridState, PixelData } from "../types";
import { encodeCoord } from "./encodeCoord";

/** Safely retrieves a pixel from the grid, returning null if not set. */
export function getPixel(grid: GridState, x: number, y: number): PixelData | null {
  return grid.get(encodeCoord(x, y)) ?? null;
}

/** Checks if a specific coordinate has been painted. */
export function isPixelPainted(grid: GridState, x: number, y: number): boolean {
  return grid.has(encodeCoord(x, y));
}

/** Returns an array of all painted coordinates as {x, y} objects. */
export function getPaintedCoordinates(grid: GridState): readonly { x: number; y: number }[] {
  return Array.from(grid.keys()).map((key) => {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
  });
}

/** Returns the total number of painted pixels. */
export function getPaintedCount(grid: GridState): number {
  return grid.size;
}
