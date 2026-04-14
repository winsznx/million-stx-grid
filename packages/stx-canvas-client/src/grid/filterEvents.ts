import { PixelEvent } from "../types";

export function filterEventsByPainter(events: PixelEvent[], painter: string): PixelEvent[] {
  return events.filter((e) => e.painter === painter);
}

export function filterEventsByColor(events: PixelEvent[], color: string): PixelEvent[] {
  return events.filter((e) => e.color.toUpperCase() === color.toUpperCase());
}

export function filterEventsByRegion(
  events: PixelEvent[],
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): PixelEvent[] {
  return events.filter(
    (e) => e.x >= minX && e.x <= maxX && e.y >= minY && e.y <= maxY
  );
}

export function filterEventsByBlockRange(
  events: PixelEvent[],
  minBlock: number,
  maxBlock: number
): PixelEvent[] {
  return events.filter(
    (e) => e.blockHeight >= minBlock && e.blockHeight <= maxBlock
  );
}
