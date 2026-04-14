import { COLOR_PALETTE } from "./constants";

export function isPaletteColor(color: string): boolean {
  return COLOR_PALETTE.includes(color.toUpperCase());
}

export function getPaletteIndex(color: string): number {
  return COLOR_PALETTE.indexOf(color.toUpperCase());
}

export function getNextColor(currentColor: string): string {
  const idx = getPaletteIndex(currentColor);
  return COLOR_PALETTE[(idx + 1) % COLOR_PALETTE.length];
}

export function getPrevColor(currentColor: string): string {
  const idx = getPaletteIndex(currentColor);
  return COLOR_PALETTE[(idx - 1 + COLOR_PALETTE.length) % COLOR_PALETTE.length];
}
