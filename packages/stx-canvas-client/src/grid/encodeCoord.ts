import { CLIENT_GRID_SIZE } from "../constants";

/**
 * Encodes grid coordinates into a unique string key.
 * @throws if coordinates are out of bounds in development.
 */
export function encodeCoord(x: number, y: number): string {
  return `${x},${y}`;
}

/**
 * Decodes a coordinate key back into numeric x, y values.
 */
export function decodeCoord(key: string): { x: number; y: number } {
  const parts = key.split(",");
  return { x: parseInt(parts[0], 10), y: parseInt(parts[1], 10) };
}

/**
 * Type guard: checks if coordinates fall within the grid.
 */
export function isValidCoord(x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < CLIENT_GRID_SIZE && y >= 0 && y < CLIENT_GRID_SIZE;
}
