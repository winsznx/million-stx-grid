import { PixelEvent, GridState } from "../types";
import { encodeCoord } from "./encodeCoord";

export function replayEventsToGrid(events: PixelEvent[]): GridState {
  const grid: GridState = new Map();

  for (const event of events) {
    grid.set(encodeCoord(event.x, event.y), {
      color: event.color,
      painter: event.painter,
    });
  }

  return grid;
}
