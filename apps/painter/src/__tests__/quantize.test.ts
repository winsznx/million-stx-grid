import { describe, it, expect } from "vitest";
import { averageColor, snapToPaletteHex, averagePixelsToHex } from "../quantize";

describe("averageColor", () => {
  it("averages components", () => {
    expect(averageColor([
      { r: 0, g: 0, b: 0 },
      { r: 200, g: 200, b: 200 },
    ])).toEqual({ r: 100, g: 100, b: 100 });
  });

  it("returns black for empty", () => {
    expect(averageColor([])).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe("snapToPaletteHex", () => {
  it("snaps to nearest palette color", () => {
    expect(snapToPaletteHex("#010203", ["#000000", "#FFFFFF"])).toBe("#000000");
  });
});

describe("averagePixelsToHex", () => {
  it("returns hex output", () => {
    expect(averagePixelsToHex([{ r: 255, g: 0, b: 0 }])).toBe("#FF0000");
  });
});
