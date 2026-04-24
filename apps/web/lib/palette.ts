import { COLOR_PALETTE } from "./constants";

/**
 * Represents the official STX Canvas color palette.
 */
export const PALETTE = Object.freeze([...COLOR_PALETTE]);

/**
 * Safely retrieves a color from the palette by index.
 */
export function getColorFromPalette(index: number): string {
  const safeIndex = Math.max(0, Math.min(PALETTE.length - 1, index));
  return PALETTE[safeIndex];
}

/**
 * Finds the index of a color in the palette.
 */
export function getPaletteIndex(color: string): number {
  return PALETTE.indexOf(color.toUpperCase());
}
