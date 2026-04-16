import { describe, it, expect } from "vitest";
import { parseCliArgs } from "../args";

describe("parseCliArgs", () => {
  it("parses image and coordinates", () => {
    const args = parseCliArgs(["--image", "./foo.png", "--x", "5", "--y", "10"]);
    expect(args.image).toBe("./foo.png");
    expect(args.x).toBe(5);
    expect(args.y).toBe(10);
  });

  it("defaults dryRun to false", () => {
    const args = parseCliArgs(["--image", "./foo.png"]);
    expect(args.dryRun).toBe(false);
  });

  it("parses --dry-run flag", () => {
    const args = parseCliArgs(["--image", "./foo.png", "--dry-run"]);
    expect(args.dryRun).toBe(true);
  });

  it("parses --delay", () => {
    const args = parseCliArgs(["--image", "./foo.png", "--delay", "1500"]);
    expect(args.delay).toBe(1500);
  });
});
