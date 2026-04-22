/**
 * Represents a color in RGB space.
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts RGB components to a hex color string.
 * @param r - Red component (0-255).
 * @param g - Green component (0-255).
 * @param b - Blue component (0-255).
 * @returns A hex color string (e.g., "#FF0000").
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts a hex color string to its RGB components.
 * @param hex - Hex color string (e.g., "#FF0000").
 * @returns An RGB object.
 */
export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/**
 * Calculates the Euclidean distance between two colors in RGB space.
 * @param hex1 - First hex color.
 * @param hex2 - Second hex color.
 * @returns The numerical distance.
 */
function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return Math.sqrt(
    (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2
  );
}

/**
 * Quantizes a color to the nearest available color in a palette.
 * @param hex - The color to quantize.
 * @param palette - The array of available hex colors.
 * @returns The closest color from the palette.
 */
export function quantizeToNearestPaletteColor(
  hex: string,
  palette: string[]
): string {
  let minDistance = Infinity;
  let closest = palette[0];

  for (const paletteColor of palette) {
    const dist = colorDistance(hex, paletteColor);
    if (dist < minDistance) {
      minDistance = dist;
      closest = paletteColor;
    }
  }

  return closest;
}

/**
 * Checks if a string is a valid 6-digit hex color.
 * @param hex - The string to validate.
 * @returns True if valid.
 */
export function isValidHexColor(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

/**
 * Converts a hex color to an RGB array.
 * @param hex - Hex color string.
 * @returns [r, g, b] array.
 */
export function hexToRgbArray(hex: string): [number, number, number] {
  const { r, g, b } = hexToRgb(hex);
  return [r, g, b];
}

/**
 * Calculates the luminance of a color.
 * @param hex - Hex color string.
 * @returns Luminance value (0-255).
 */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/**
 * Determines if a color is "dark" based on its luminance.
 * @param hex - Hex color string.
 * @returns True if dark.
 */
export function isDarkColor(hex: string): boolean {
  return luminance(hex) < 128;
}
