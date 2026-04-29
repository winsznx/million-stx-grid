import type { PixelEvent } from "../types";
import { CLIENT_GRID_SIZE } from "../constants";

/**
 * Validates that a partial event has all required fields and valid ranges.
 */
export function isValidPixelEvent(event: Partial<PixelEvent>): event is PixelEvent {
  return (
    typeof event.x === "number" &&
    typeof event.y === "number" &&
    typeof event.color === "string" &&
    typeof event.painter === "string" &&
    typeof event.txId === "string" &&
    typeof event.blockHeight === "number" &&
    event.x >= 0 && event.x < CLIENT_GRID_SIZE &&
    event.y >= 0 && event.y < CLIENT_GRID_SIZE &&
    event.color.length === 7 &&
    event.color.startsWith("#")
  );
}
