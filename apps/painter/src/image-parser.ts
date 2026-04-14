import sharp from "sharp";
import { rgbToHex } from "./color-utils";

export interface PixelInstruction {
  x: number;
  y: number;
  color: string;
}

const GRID_SIZE = 100;
const CHANNELS_RGBA = 4;
const MAX_DIMENSION = 32;

export async function parseImageToPixels(
  imagePath: string,
  offsetX: number,
  offsetY: number
): Promise<PixelInstruction[]> {
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height || metadata.width === 0 || metadata.height === 0) {
    throw new Error("Could not read image dimensions");
  }

  const maxWidth = Math.min(MAX_DIMENSION, GRID_SIZE - offsetX);
  const maxHeight = Math.min(MAX_DIMENSION, GRID_SIZE - offsetY);

  if (maxWidth <= 0 || maxHeight <= 0) {
    throw new Error(
      `Offset (${offsetX}, ${offsetY}) leaves no room on the grid`
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

      if (a === 0) continue;

      const absX = offsetX + x;
      const absY = offsetY + y;

      if (absX >= GRID_SIZE || absY >= GRID_SIZE) {
        throw new Error(
          `Pixel at (${absX}, ${absY}) is out of grid bounds (0-${GRID_SIZE - 1})`
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
