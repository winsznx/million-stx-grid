import sharp from "sharp";
import { rgbToHex } from "./color-utils";

/**
 * Represents a single pixel painting instruction.
 */
export interface PixelInstruction {
  /** The X-coordinate on the grid (0-indexed). */
  x: number;
  /** The Y-coordinate on the grid (0-indexed). */
  y: number;
  /** The hex color string (e.g., "#FF0000"). */
  color: string;
}

const GRID_SIZE = 100;
const CHANNELS_RGBA = 4;
const MAX_DIMENSION = 32;

/**
 * Parses an image file and converts it into a series of pixel instructions.
 * 
 * @param imagePath - The path to the image file to parse.
 * @param offsetX - The X-offset on the grid where the image should start.
 * @param offsetY - The Y-offset on the grid where the image should start.
 * @returns A promise that resolves to an array of PixelInstruction objects.
 * @throws Error if the image cannot be read, dimensions are invalid, or it exceeds grid bounds.
 */
export async function parseImageToPixels(
  imagePath: string,
  offsetX: number,
  offsetY: number
): Promise<PixelInstruction[]> {
  const image = sharp(imagePath);
  let metadata;
  
  try {
    metadata = await image.metadata();
  } catch (err) {
    throw new Error(`Failed to read image metadata: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!metadata.width || !metadata.height) {
    throw new Error(`Invalid image dimensions: ${metadata.width}x${metadata.height}`);
  }

  const maxWidth = Math.min(MAX_DIMENSION, GRID_SIZE - offsetX);
  const maxHeight = Math.min(MAX_DIMENSION, GRID_SIZE - offsetY);

  if (maxWidth <= 0 || maxHeight <= 0) {
    throw new Error(
      `Offset (${offsetX}, ${offsetY}) leaves no room on the grid (GRID_SIZE=${GRID_SIZE})`
    );
  }

  const resizeWidth = Math.min(metadata.width, maxWidth);
  const resizeHeight = Math.min(metadata.height, maxHeight);

  const { data, info } = await image
    .resize(resizeWidth, resizeHeight, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels: PixelInstruction[] = [];

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * CHANNELS_RGBA;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Skip fully transparent pixels
      if (a === 0) continue;

      const absX = offsetX + x;
      const absY = offsetY + y;

      if (absX >= GRID_SIZE || absY >= GRID_SIZE || absX < 0 || absY < 0) {
        throw new Error(
          `Calculated pixel position (${absX}, ${absY}) is out of grid bounds (0-${GRID_SIZE - 1})`
        );
      }

      pixels.push({
        x: absX,
        y: absY,
        color: rgbToHex(r, g, b),
      });
    }
  }

  return pixels;
}
