import { describe, it, expect } from "vitest";
import { clamp, lerp } from "../clamp";

describe("clamp", () => {
  it("returns value within bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps upper bound", () => {
    expect(clamp(20, 0, 10)).toBe(10);
  });

  it("clamps lower bound", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });
});

describe("lerp", () => {
  it("interpolates midpoint", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("clamps t to 0..1", () => {
    expect(lerp(0, 10, 2)).toBe(10);
    expect(lerp(0, 10, -1)).toBe(0);
  });
});
