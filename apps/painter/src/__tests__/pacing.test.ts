import { describe, it, expect } from "vitest";
import { estimateDurationMs, estimateCompletionTime } from "../pacing";

describe("estimateDurationMs", () => {
  it("handles empty queue", () => {
    expect(estimateDurationMs(0, 500)).toBe(0);
  });

  it("excludes delay before first pixel", () => {
    expect(estimateDurationMs(1, 500)).toBe(0);
  });

  it("sums gaps between pixels", () => {
    expect(estimateDurationMs(3, 500)).toBe(1000);
  });
});

describe("estimateCompletionTime", () => {
  it("returns a date offset from now", () => {
    const now = 1_000_000_000;
    const out = estimateCompletionTime(3, 500, now);
    expect(out.getTime()).toBe(now + 1000);
  });
});
