import { describe, it, expect } from "vitest";
import { replayEventsToGrid } from "../replayEvents";
import type { PixelEvent } from "../../types";

const base: Omit<PixelEvent, "x" | "y" | "color" | "blockHeight"> = {
  painter: "SP1",
  txId: "0xabc",
  timestamp: null,
};

describe("replayEventsToGrid", () => {
  it("applies last write wins by block height", () => {
    const events: PixelEvent[] = [
      { ...base, x: 0, y: 0, color: "#FF0000", blockHeight: 1 },
      { ...base, x: 0, y: 0, color: "#00FF00", blockHeight: 2 },
    ];
    const grid = replayEventsToGrid(events);
    expect(grid.get("0,0")?.color).toBe("#00FF00");
  });

  it("preserves independent pixels", () => {
    const events: PixelEvent[] = [
      { ...base, x: 0, y: 0, color: "#AAA000", blockHeight: 1 },
      { ...base, x: 1, y: 0, color: "#BBB111", blockHeight: 2 },
    ];
    const grid = replayEventsToGrid(events);
    expect(grid.size).toBe(2);
  });
});
