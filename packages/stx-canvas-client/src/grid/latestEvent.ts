import type { PixelEvent } from "../types";

/**
 * Returns the event with the highest block height.
 */
export function getLatestEvent(events: readonly PixelEvent[]): PixelEvent | null {
  if (events.length === 0) return null;
  let latest = events[0];
  for (let i = 1; i < events.length; i++) {
    if (events[i].blockHeight > latest.blockHeight) latest = events[i];
  }
  return latest;
}

/**
 * Filters events to only those at a specific block height.
 */
export function getEventsAtBlock(events: readonly PixelEvent[], block: number): readonly PixelEvent[] {
  return events.filter((e) => e.blockHeight === block);
}
