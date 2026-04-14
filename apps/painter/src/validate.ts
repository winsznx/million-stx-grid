import { PixelInstruction } from "./image-parser";

const GRID_SIZE = 100;

export function validatePixelInstructions(pixels: PixelInstruction[]): string[] {
  const errors: string[] = [];

  for (const pixel of pixels) {
    if (pixel.x < 0 || pixel.x >= GRID_SIZE) {
      errors.push(`X coordinate ${pixel.x} out of bounds`);
    }
    if (pixel.y < 0 || pixel.y >= GRID_SIZE) {
      errors.push(`Y coordinate ${pixel.y} out of bounds`);
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(pixel.color)) {
      errors.push(`Invalid color format: ${pixel.color}`);
    }
  }

  return errors;
}

export function deduplicatePixels(pixels: PixelInstruction[]): PixelInstruction[] {
  const seen = new Set<string>();
  return pixels.filter((pixel) => {
    const key = `${pixel.x},${pixel.y}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
