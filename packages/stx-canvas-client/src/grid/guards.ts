import { PixelEvent } from "../types";

export function isPixelEvent(value: unknown): value is PixelEvent {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.x === "number" &&
    typeof obj.y === "number" &&
    typeof obj.color === "string" &&
    typeof obj.painter === "string" &&
    typeof obj.txId === "string" &&
    typeof obj.blockHeight === "number"
  );
}

export function assertPixelEvent(value: unknown): asserts value is PixelEvent {
  if (!isPixelEvent(value)) throw new Error("Invalid PixelEvent shape");
}
