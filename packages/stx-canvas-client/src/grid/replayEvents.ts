import type { PixelEvent, GridState } from "../types";
import { encodeCoord } from "./encodeCoord";

/**
 * Replays a list of paint events onto a fresh grid state.
 * Events are applied in order; later events overwrite earlier ones.
 */
export function replayEventsToGrid(events: readonly PixelEvent[]): GridState {
  const grid: GridState = new Map();
  for (const event of events) {
    grid.set(encodeCoord(event.x, event.y), {
      color: event.color,
      painter: event.painter,
    });
  }
  return grid;
}
