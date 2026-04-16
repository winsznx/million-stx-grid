import { GRID_SIZE } from "./constants";

export function toPixelKey(x: number, y: number): string {
  return `${x}:${y}`;
}

export function fromPixelKey(key: string): { x: number; y: number } | null {
  const [xStr, yStr] = key.split(":");
  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
  return { x, y };
}
