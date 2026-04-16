import { describe, it, expect } from "vitest";
import { chunk } from "../chunk";

describe("chunk", () => {
  it("splits array into equal parts", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it("handles remainder", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws for non-positive size", () => {
    expect(() => chunk([1], 0)).toThrow();
  });
});
