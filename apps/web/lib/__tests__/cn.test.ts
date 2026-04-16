import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("flattens nested arrays", () => {
    expect(cn("a", ["b", ["c", false]], "d")).toBe("a b c d");
  });
});
