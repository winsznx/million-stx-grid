import { PixelEvent } from "../types";

/**
 * Runtime type guard for PixelEvent objects.
 */
export function isPixelEvent(obj: unknown): obj is PixelEvent {
  if (typeof obj !== "object" || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.x === "number" &&
    typeof o.y === "number" &&
    typeof o.color === "string" &&
    typeof o.painter === "string" &&
    typeof o.txId === "string" &&
    typeof o.blockHeight === "number"
  );
}

/**
 * Assertion guard that throws if value is not a PixelEvent.
 */
export function assertPixelEvent(value: unknown): asserts value is PixelEvent {
  if (!isPixelEvent(value)) {
    throw new TypeError("Expected a valid PixelEvent, received: " + typeof value);
  }
}
