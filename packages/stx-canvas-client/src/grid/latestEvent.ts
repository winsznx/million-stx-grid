import { PixelEvent } from "../types";

export function getLatestEvent(events: readonly PixelEvent[]): PixelEvent | null {
  if (events.length === 0) return null;
  let latest = events[0];
  for (const event of events) {
    if (event.blockHeight > latest.blockHeight) latest = event;
  }
  return latest;
}

export function getEventsAtBlock(events: readonly PixelEvent[], block: number): PixelEvent[] {
  return events.filter((e) => e.blockHeight === block);
}
