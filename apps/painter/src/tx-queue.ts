import {
  makeContractCall,
  broadcastTransaction,
  uintCV,
  stringAsciiCV,
  AnchorMode,
  PostConditionMode,
} from "@stacks/transactions";
import { StacksMainnet, StacksTestnet, type StacksNetwork } from "@stacks/network";
import { PixelInstruction } from "./image-parser";
import * as logger from "./logger";

function resolveNetwork(): StacksNetwork {
  const id = process.env.PAINTER_NETWORK ?? "mainnet";
  if (id === "testnet") return new StacksTestnet();
  return new StacksMainnet();
}

/**
 * Utility to wait for a specified duration.
 * @param ms - Milliseconds to wait.
 */
function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Iterates through a queue of pixel instructions and broadcasts contract calls to paint them.
 * 
 * @param pixels - Array of PixelInstruction objects.
 * @param privateKey - The private key to sign transactions.
 * @param contractDeployer - The contract deployer address.
 * @param contractName - The name of the contract.
 * @param delayMs - The delay between transactions in milliseconds.
 * @param dryRun - If true, only logs the intention without broadcasting.
 */
export async function broadcastPixelQueue(
  pixels: PixelInstruction[],
  privateKey: string,
  contractDeployer: string,
  contractName: string,
  delayMs: number,
  dryRun: boolean
): Promise<void> {
  const network = resolveNetwork();
  const total = pixels.length;
  const startTime = Date.now();

  for (let i = 0; i < total; i++) {
    const pixel = pixels[i];
    const progress = `[${i + 1}/${total}]`;

    if (dryRun) {
      logger.info(
        `${progress} [DRY RUN] (${pixel.x}, ${pixel.y}) → ${pixel.color}`
      );
      continue;
    }

    try {
      const txOptions = {
        contractAddress: contractDeployer,
        contractName,
        functionName: "paint-pixel",
        functionArgs: [
          uintCV(pixel.x),
          uintCV(pixel.y),
          stringAsciiCV(pixel.color),
        ],
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
      };

      const transaction = await makeContractCall(txOptions);
      const result = await broadcastTransaction(transaction, network);

      if ("error" in result) {
        logger.error(
          `${progress} Error painting (${pixel.x}, ${pixel.y}): ${result.error} - ${result.reason}`
        );
      } else {
        logger.info(
          `${progress} Painted (${pixel.x}, ${pixel.y}) → ${pixel.color} | TXID: ${result.txid}`
        );
      }
    } catch (err) {
      logger.error(
        `${progress} Failed to broadcast (${pixel.x}, ${pixel.y}): ${err instanceof Error ? err.message : String(err)}`
      );
    }

    if (i < total - 1) {
      await waitMs(delayMs);
    }
  }

  const endTime = Date.now();
  const durationSec = Math.round((endTime - startTime) / 1000);
  logger.info(`Processing complete. ${total} pixels processed in ${durationSec}s.`);
}
