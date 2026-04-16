import { describe, it, expect } from "vitest";
import { buildQueryString, parseQueryString } from "../query-string";

describe("buildQueryString", () => {
  it("returns empty string for no entries", () => {
    expect(buildQueryString({})).toBe("");
  });

  it("encodes key-value pairs", () => {
    const out = buildQueryString({ a: "1", b: 2 });
    expect(out.startsWith("?")).toBe(true);
    expect(out).toContain("a=1");
    expect(out).toContain("b=2");
  });

  it("drops undefined and null", () => {
    expect(buildQueryString({ a: undefined, b: null, c: 1 })).toBe("?c=1");
  });
});

describe("parseQueryString", () => {
  it("parses leading question mark", () => {
    expect(parseQueryString("?a=1&b=2")).toEqual({ a: "1", b: "2" });
  });

  it("parses without leading question mark", () => {
    expect(parseQueryString("a=1")).toEqual({ a: "1" });
  });
});
