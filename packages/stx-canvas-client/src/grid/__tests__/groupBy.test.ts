import { describe, it, expect } from "vitest";
import { groupBy } from "../groupBy";

describe("groupBy", () => {
  it("groups by key function", () => {
    const result = groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"));
    expect(result.get("even")).toEqual([2, 4]);
    expect(result.get("odd")).toEqual([1, 3]);
  });

  it("returns empty map for empty input", () => {
    expect(groupBy<number, string>([], () => "x").size).toBe(0);
  });
});
