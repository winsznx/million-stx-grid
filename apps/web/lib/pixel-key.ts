import { GRID_SIZE } from "./constants";

/** Encodes pixel coordinates into a colon-separated key. */
export function toPixelKey(x: number, y: number): string {
  return `${x}:${y}`;
}

/**
 * Decodes a pixel key back into coordinates.
 * @returns The coordinates or null if the key is invalid or out of bounds.
 */
export function fromPixelKey(key: string): { readonly x: number; readonly y: number } | null {
  const parts = key.split(":");
  if (parts.length !== 2) return null;
  const x = parseInt(parts[0], 10);
  const y = parseInt(parts[1], 10);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
  return { x, y };
}
