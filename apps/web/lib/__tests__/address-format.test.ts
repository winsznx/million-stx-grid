import { describe, it, expect } from "vitest";
import { shortAddress, mediumAddress, fullAddress } from "../address-format";

describe("shortAddress", () => {
  it("returns original for short input", () => {
    expect(shortAddress("abcd")).toBe("abcd");
  });

  it("truncates long input", () => {
    const out = shortAddress("SP123456789ABCDEF");
    expect(out).toContain("…");
  });

  it("returns empty string for empty input", () => {
    expect(shortAddress("")).toBe("");
  });
});

describe("mediumAddress", () => {
  it("truncates with 8/4 split", () => {
    expect(mediumAddress("SP1234567890ABCDEF")).toMatch(/SP123456.*CDEF/);
  });
});

describe("fullAddress", () => {
  it("uppercases and trims", () => {
    expect(fullAddress("  sp123  ")).toBe("SP123");
  });
});
