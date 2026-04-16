import { rgbToHex, hexToRgb } from "./color-utils";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function averageColor(pixels: readonly RgbColor[]): RgbColor {
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

export function snapToPaletteHex(hex: string, palette: readonly string[]): string {
  const target = hexToRgb(hex);
  let best = palette[0];
  let bestDist = Infinity;
  for (const candidate of palette) {
    const { r, g, b } = hexToRgb(candidate);
    const dist = (r - target.r) ** 2 + (g - target.g) ** 2 + (b - target.b) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }
  return best;
}

export function averagePixelsToHex(pixels: readonly RgbColor[]): string {
  const avg = averageColor(pixels);
  return rgbToHex(avg.r, avg.g, avg.b);
}
