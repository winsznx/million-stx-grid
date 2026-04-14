import { PIXEL_SIZE, GRID_SIZE, CANVAS_SIZE } from "./constants";

export function canvasToGrid(canvasX: number, canvasY: number): { x: number; y: number } | null {
  const x = Math.floor(canvasX / PIXEL_SIZE);
  const y = Math.floor(canvasY / PIXEL_SIZE);
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
  return { x, y };
}

export function gridToCanvas(gridX: number, gridY: number): { x: number; y: number } {
  return {
    x: gridX * PIXEL_SIZE,
    y: gridY * PIXEL_SIZE,
  };
}

export function clientToCanvas(
  clientX: number,
  clientY: number,
  rect: DOMRect
): { x: number; y: number } {
  const scaleX = CANVAS_SIZE / rect.width;
  const scaleY = CANVAS_SIZE / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}
