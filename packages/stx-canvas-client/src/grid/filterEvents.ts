import type { PixelEvent } from "../types";

/** Filters events by painter address. */
export function filterEventsByPainter(events: readonly PixelEvent[], painter: string): readonly PixelEvent[] {
  return events.filter((e) => e.painter === painter);
}

/** Filters events by color (case-insensitive). */
export function filterEventsByColor(events: readonly PixelEvent[], color: string): readonly PixelEvent[] {
  const upper = color.toUpperCase();
  return events.filter((e) => e.color.toUpperCase() === upper);
}

/** Filters events within a rectangular region. */
export function filterEventsByRegion(
  events: readonly PixelEvent[],
  minX: number, minY: number, maxX: number, maxY: number
): readonly PixelEvent[] {
  return events.filter((e) => e.x >= minX && e.x <= maxX && e.y >= minY && e.y <= maxY);
}

/** Filters events within a block height range. */
export function filterEventsByBlockRange(
  events: readonly PixelEvent[],
  minBlock: number, maxBlock: number
): readonly PixelEvent[] {
  return events.filter((e) => e.blockHeight >= minBlock && e.blockHeight <= maxBlock);
}
