import { parseImageToPixels } from "./image-parser";
import { broadcastPixelQueue } from "./tx-queue";
import { parseCliArgs } from "./args";
import * as logger from "./logger";
import { loadConfigFromEnv } from "./config";

/**
 * Main entry point for the STX Canvas Painter.
 * Parses CLI arguments, loads environment configuration, and starts the painting process.
 */
async function main() {
  let args;
  try {
    args = parseCliArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    console.log("\nUsage: pnpm start --image <path> [--x N] [--y N] [--delay ms] [--dry-run]");
    process.exit(1);
  }

  const envConfig = loadConfigFromEnv();
  const contractDeployer = envConfig.contractDeployer;
  const contractName = envConfig.contractName ?? "stx-canvas";
  const privateKey = envConfig.privateKey;

  if (!args.dryRun && (!contractDeployer || !privateKey)) {
    logger.error(
      "PAINTER_CONTRACT_DEPLOYER and PAINTER_PRIVATE_KEY must be set in environment for LIVE mode."
    );
    process.exit(1);
  }

  logger.info(`Starting painter...`);
  logger.info(`Image: ${args.image}`);
  logger.info(`Offset: (${args.x}, ${args.y})`);
  logger.info(`Delay: ${args.delay}ms`);
  logger.info(`Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}`);

  let pixels;
  try {
    pixels = await parseImageToPixels(args.image, args.x, args.y);
  } catch (err) {
    logger.error(`Failed to parse image: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }

  logger.info(`Found ${pixels.length} paintable pixels.`);
  
  const estimatedSeconds = Math.ceil((pixels.length * args.delay) / 1000);
  logger.info(`Estimated total time: ${estimatedSeconds}s\n`);

  try {
    await broadcastPixelQueue(
      pixels,
      privateKey ?? "",
      contractDeployer ?? "",
      contractName,
      args.delay,
      args.dryRun
    );
  } catch (err) {
    logger.error(`Fatal error during broadcast: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error(`Unhandled fatal error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
