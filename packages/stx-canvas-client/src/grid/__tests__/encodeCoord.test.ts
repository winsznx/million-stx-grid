import { describe, it, expect } from "vitest";
import { encodeCoord, decodeCoord, isValidCoord, coordToIndex, indexToCoord } from "../encodeCoord";

describe("encodeCoord", () => {
  it("encodes as comma-separated", () => {
    expect(encodeCoord(3, 4)).toBe("3,4");
  });
});

describe("decodeCoord", () => {
  it("round-trips", () => {
    expect(decodeCoord(encodeCoord(12, 34))).toEqual({ x: 12, y: 34 });
  });
});

describe("isValidCoord", () => {
  it("enforces bounds", () => {
    expect(isValidCoord(0, 0, 100)).toBe(true);
    expect(isValidCoord(100, 0, 100)).toBe(false);
  });
});

describe("coordToIndex / indexToCoord", () => {
  it("round-trips through index", () => {
    const coord = { x: 7, y: 13 };
    const idx = coordToIndex(coord.x, coord.y, 100);
    expect(indexToCoord(idx, 100)).toEqual(coord);
  });
});
