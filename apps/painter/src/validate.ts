import { PixelInstruction } from "./image-parser";
import { isValidHexColor } from "./color-utils";

const GRID_SIZE = 100;

/**
 * Validates an array of pixel instructions for grid bounds and color format.
 * @param pixels - Array of PixelInstruction objects to validate.
 * @returns An array of error strings. Empty if all pixels are valid.
 */
export function validatePixelInstructions(pixels: PixelInstruction[]): string[] {
  const errors: string[] = [];

  for (const pixel of pixels) {
    if (pixel.x < 0 || pixel.x >= GRID_SIZE) {
      errors.push(`X coordinate ${pixel.x} out of bounds (0-${GRID_SIZE - 1})`);
    }
    if (pixel.y < 0 || pixel.y >= GRID_SIZE) {
      errors.push(`Y coordinate ${pixel.y} out of bounds (0-${GRID_SIZE - 1})`);
    }
    if (!isValidHexColor(pixel.color)) {
      errors.push(`Invalid color format: "${pixel.color}" (expected #RRGGBB)`);
    }
  }

  return errors;
}

/**
 * Removes duplicate pixels from an array, keeping only the first occurrence for each coordinate.
 * @param pixels - Array of PixelInstruction objects.
 * @returns A new array with unique coordinates.
 */
export function deduplicatePixels(pixels: PixelInstruction[]): PixelInstruction[] {
  const seen = new Set<string>();
  return pixels.filter((pixel) => {
    const key = `${pixel.x},${pixel.y}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
