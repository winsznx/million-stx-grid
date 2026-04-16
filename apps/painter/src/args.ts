export interface CliArgs {
  image: string;
  x: number;
  y: number;
  delay: number;
  dryRun: boolean;
}

const DEFAULT_DELAY_MS = 500;

export function parseCliArgs(argv: readonly string[]): CliArgs {
  const result: CliArgs = {
    image: "",
    x: 0,
    y: 0,
    delay: DEFAULT_DELAY_MS,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
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

  return result;
}
