import { GRID_SIZE, COLOR_PALETTE } from "./constants";

export function isValidGridCoord(x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

export function isValidPaletteColor(color: string): boolean {
  return COLOR_PALETTE.includes(color);
}

export function isValidHexColor(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}
