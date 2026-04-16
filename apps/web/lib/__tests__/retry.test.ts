import { describe, it, expect, vi } from "vitest";
import { retryWithBackoff } from "../retry";

describe("retryWithBackoff", () => {
  it("resolves on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await retryWithBackoff(fn, { maxAttempts: 3, delayMs: 1 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries until success", async () => {
    let calls = 0;
    const fn = vi.fn().mockImplementation(async () => {
      calls += 1;
      if (calls < 3) throw new Error("fail");
      return "ok";
    });
    const result = await retryWithBackoff(fn, { maxAttempts: 5, delayMs: 1 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("throws after all attempts exhausted", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("nope"));
    await expect(retryWithBackoff(fn, { maxAttempts: 2, delayMs: 1 })).rejects.toThrow("nope");
  });
});
