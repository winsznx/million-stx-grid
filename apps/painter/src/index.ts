import { parseImageToPixels } from "./image-parser";
import { broadcastPixelQueue } from "./tx-queue";

interface CliArgs {
  image: string;
  x: number;
  y: number;
  delay: number;
  dryRun: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const result: CliArgs = {
    image: "",
    x: 0,
    y: 0,
    delay: 500,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--image":
        result.image = args[++i];
        break;
      case "--x":
        result.x = parseInt(args[++i], 10);
        break;
      case "--y":
        result.y = parseInt(args[++i], 10);
        break;
      case "--delay":
        result.delay = parseInt(args[++i], 10);
        break;
      case "--dry-run":
        result.dryRun = true;
        break;
    }
  }

  if (!result.image) {
    console.error("Usage: pnpm painter --image <path> [--x N] [--y N] [--delay ms] [--dry-run]");
    process.exit(1);
  }

  return result;
}

async function main() {
  const args = parseArgs();
  const contractDeployer = process.env.PAINTER_CONTRACT_DEPLOYER;
  const contractName = process.env.PAINTER_CONTRACT_NAME ?? "stx-canvas";
  const privateKey = process.env.PAINTER_PRIVATE_KEY;

  if (!args.dryRun && (!contractDeployer || !privateKey)) {
    console.error(
      "PAINTER_CONTRACT_DEPLOYER and PAINTER_PRIVATE_KEY must be set for live mode"
    );
    process.exit(1);
  }

  console.log(`Parsing image: ${args.image}`);
  console.log(`Offset: (${args.x}, ${args.y})`);
  console.log(`Delay: ${args.delay}ms`);
  console.log(`Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}\n`);

  const pixels = await parseImageToPixels(args.image, args.x, args.y);
  console.log(`Found ${pixels.length} paintable pixels`);
  console.log(`Estimated time: ${Math.ceil((pixels.length * args.delay) / 1000)}s\n`);

  await broadcastPixelQueue(
    pixels,
    privateKey ?? "",
    contractDeployer ?? "",
    contractName,
    args.delay,
    args.dryRun
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
