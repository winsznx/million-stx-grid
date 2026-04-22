/**
 * Command-line arguments for the painter application.
 */
export interface CliArgs {
  /** Path to the image file to paint. */
  image: string;
  /** Starting X coordinate on the grid. */
  x: number;
  /** Starting Y coordinate on the grid. */
  y: number;
  /** Delay between transactions in milliseconds. */
  delay: number;
  /** Whether to run in dry-run mode (no transactions). */
  dryRun: boolean;
}

const DEFAULT_DELAY_MS = 500;

/**
 * Parses command-line arguments into a structured CliArgs object.
 * @param argv - The raw command-line arguments array (e.g., process.argv.slice(2)).
 * @returns A CliArgs object with parsed values.
 * @throws Error if required arguments are missing or invalid.
 */
export function parseCliArgs(argv: readonly string[]): CliArgs {
  const result: CliArgs = {
    image: "",
    x: 0,
    y: 0,
    delay: DEFAULT_DELAY_MS,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--image":
        result.image = argv[++i] ?? "";
        break;
      case "--x":
        result.x = parseInt(argv[++i] ?? "0", 10);
        break;
      case "--y":
        result.y = parseInt(argv[++i] ?? "0", 10);
        break;
      case "--delay":
        result.delay = parseInt(argv[++i] ?? String(DEFAULT_DELAY_MS), 10);
        break;
      case "--dry-run":
        result.dryRun = true;
        break;
    }
  }

  if (!result.image) {
    throw new Error("Missing required argument: --image <path>");
  }

  if (isNaN(result.x) || isNaN(result.y)) {
    throw new Error("Coordinates --x and --y must be valid numbers");
  }

  if (isNaN(result.delay) || result.delay < 0) {
    throw new Error("Delay must be a non-negative number");
  }

  return result;
}
