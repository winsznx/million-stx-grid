import { describe, it, expect } from "vitest";
import { formatDuration, formatPixelLine } from "../format";

describe("formatDuration", () => {
  it("formats sub-second", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatDuration(2500)).toBe("3s");
  });

  it("formats minutes", () => {
    expect(formatDuration(90_000)).toBe("1m 30s");
  });
});

describe("formatPixelLine", () => {
  it("renders 1-based index", () => {
    expect(formatPixelLine(0, 2, 3, 4, "#FFFFFF")).toBe("[1/2] (3, 4) -> #FFFFFF");
  });
});
