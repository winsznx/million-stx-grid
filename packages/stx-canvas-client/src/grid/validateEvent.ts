import { PixelEvent } from "../types";

export function isValidPixelEvent(event: Partial<PixelEvent>): event is PixelEvent {
  return (
    typeof event.x === "number" &&
    typeof event.y === "number" &&
    typeof event.color === "string" &&
    typeof event.painter === "string" &&
    typeof event.txId === "string" &&
    typeof event.blockHeight === "number" &&
    event.x >= 0 &&
    event.x < 100 &&
    event.y >= 0 &&
    event.y < 100 &&
    event.color.length === 7
  );
}
