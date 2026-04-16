import { describe, it, expect } from "vitest";
import { toPixelKey, fromPixelKey } from "../pixel-key";

describe("toPixelKey", () => {
  it("serializes coordinates", () => {
    expect(toPixelKey(3, 4)).toBe("3:4");
  });
});

describe("fromPixelKey", () => {
  it("parses valid key", () => {
    expect(fromPixelKey("3:4")).toEqual({ x: 3, y: 4 });
  });

  it("rejects out-of-bounds", () => {
    expect(fromPixelKey("101:5")).toBeNull();
  });

  it("rejects non-numeric", () => {
    expect(fromPixelKey("abc:def")).toBeNull();
  });
});
