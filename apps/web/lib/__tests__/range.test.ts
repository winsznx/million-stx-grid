import { describe, it, expect } from "vitest";
import { range } from "../range";

describe("range", () => {
  it("generates 0..n with single arg", () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it("respects start and end", () => {
    expect(range(2, 5)).toEqual([2, 3, 4]);
  });

  it("supports custom step", () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  it("supports negative step", () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  it("throws on zero step", () => {
    expect(() => range(0, 1, 0)).toThrow();
  });
});
