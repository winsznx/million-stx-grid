import type { GridState } from "@winsznx/stx-canvas-client";
import { GRID_SIZE } from "./constants";
import { encodeCoord } from "@winsznx/stx-canvas-client";

export function gridToJSON(grid: GridState): string {
  const obj: Record<string, { color: string; painter: string }> = {};
  for (const [key, value] of grid.entries()) {
    obj[key] = value;
  }
  return JSON.stringify(obj, null, 2);
}

export function gridToCSV(grid: GridState): string {
  const lines = ["x,y,color,painter"];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const pixel = grid.get(encodeCoord(x, y));
      if (pixel) {
        lines.push(`${x},${y},${pixel.color},${pixel.painter}`);
      }
    }
  }
  return lines.join("\n");
}
