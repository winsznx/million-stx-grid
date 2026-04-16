import { describe, it, expect } from "vitest";
import { isValidGridCoord, isValidHexColor, isValidPaletteColor } from "../validation";
import { COLOR_PALETTE } from "../constants";

describe("isValidGridCoord", () => {
  it("accepts valid coords", () => {
    expect(isValidGridCoord(0, 0)).toBe(true);
    expect(isValidGridCoord(99, 99)).toBe(true);
  });

  it("rejects out-of-bounds", () => {
    expect(isValidGridCoord(100, 0)).toBe(false);
    expect(isValidGridCoord(-1, 0)).toBe(false);
  });
});

describe("isValidHexColor", () => {
  it("accepts #RRGGBB", () => {
    expect(isValidHexColor("#00FF94")).toBe(true);
    expect(isValidHexColor("#00ff94")).toBe(true);
  });

  it("rejects wrong length", () => {
    expect(isValidHexColor("#FFF")).toBe(false);
  });
});

describe("isValidPaletteColor", () => {
  it("accepts palette entries", () => {
    expect(isValidPaletteColor(COLOR_PALETTE[0])).toBe(true);
  });

  it("rejects non-palette", () => {
    expect(isValidPaletteColor("#123456")).toBe(false);
  });
});
