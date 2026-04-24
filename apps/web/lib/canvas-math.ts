import { GRID_SIZE, PIXEL_SIZE } from "./constants";

/**
 * Calculates grid coordinates from absolute canvas coordinates.
 */
export function canvasToGrid(x: number, y: number): { x: number; y: number } {
  return {
    x: Math.floor(x / PIXEL_SIZE),
    y: Math.floor(y / PIXEL_SIZE),
  };
}

/**
 * Validates if coordinates are within the grid bounds.
 */
export function isWithinBounds(x: number, y: number): boolean {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

/**
 * Clamps a coordinate value to grid boundaries.
 */
export function clampCoord(val: number): number {
  return Math.max(0, Math.min(GRID_SIZE - 1, val));
}
