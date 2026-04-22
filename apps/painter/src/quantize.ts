import { rgbToHex, hexToRgb, type RGB } from "./color-utils";

/**
 * Calculates the average color from an array of RGB pixels.
 * @param pixels - A read-only array of RGB objects.
 * @returns The average RGB color.
 */
export function averageColor(pixels: readonly RGB[]): RGB {
  if (pixels.length === 0) return { r: 0, g: 0, b: 0 };
  let r = 0;
  let g = 0;
  let b = 0;
  for (const p of pixels) {
    r += p.r;
    g += p.g;
    b += p.b;
  }
  return {
    r: Math.round(r / pixels.length),
    g: Math.round(g / pixels.length),
    b: Math.round(b / pixels.length),
  };
}

/**
 * Snaps a hex color to the nearest color in a given palette using squared Euclidean distance.
 * @param hex - The input hex color string.
 * @param palette - A read-only array of palette hex color strings.
 * @returns The nearest palette color hex string.
 */
export function snapToPaletteHex(hex: string, palette: readonly string[]): string {
  const target = hexToRgb(hex);
  let best = palette[0];
  let bestDistSq = Infinity;
  for (const candidate of palette) {
    const { r, g, b } = hexToRgb(candidate);
    // Use squared distance to avoid expensive Math.sqrt()
    const distSq = (r - target.r) ** 2 + (g - target.g) ** 2 + (b - target.b) ** 2;
    if (distSq < bestDistSq) {
      bestDistSq = distSq;
      best = candidate;
    }
  }
  return best;
}

/**
 * Calculates the average color of a pixel set and returns it as a hex string.
 * @param pixels - A read-only array of RGB objects.
 * @returns The average color as a hex string.
 */
export function averagePixelsToHex(pixels: readonly RGB[]): string {
  const avg = averageColor(pixels);
  return rgbToHex(avg.r, avg.g, avg.b);
}
