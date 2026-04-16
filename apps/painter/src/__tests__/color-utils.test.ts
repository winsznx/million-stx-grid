import { describe, it, expect } from "vitest";
import { rgbToHex, hexToRgb, luminance, isDarkColor } from "../color-utils";

describe("rgbToHex", () => {
  it("encodes zeros", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  it("encodes max values", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#FFFFFF");
  });

  it("pads single digit components", () => {
    expect(rgbToHex(1, 2, 3)).toBe("#010203");
  });
});

describe("hexToRgb", () => {
  it("decodes values", () => {
    expect(hexToRgb("#FF8800")).toEqual({ r: 255, g: 136, b: 0 });
  });
});

describe("luminance / isDarkColor", () => {
  it("flags dark colors", () => {
    expect(isDarkColor("#000000")).toBe(true);
    expect(isDarkColor("#FFFFFF")).toBe(false);
  });

  it("returns non-negative numbers", () => {
    expect(luminance("#808080")).toBeGreaterThanOrEqual(0);
  });
});
