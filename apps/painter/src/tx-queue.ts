import {
  makeContractCall,
  broadcastTransaction,
  uintCV,
  stringAsciiCV,
  AnchorMode,
  PostConditionMode,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { PixelInstruction } from "./image-parser";

function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function broadcastPixelQueue(
  pixels: PixelInstruction[],
  privateKey: string,
  contractDeployer: string,
  contractName: string,
  delayMs: number,
  dryRun: boolean
): Promise<void> {
  const network = new StacksMainnet();
  const total = pixels.length;
  const startTime = Date.now();

  for (let i = 0; i < total; i++) {
    const pixel = pixels[i];
    const progress = `[${i + 1}/${total}]`;

    if (dryRun) {
      console.log(
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
        console.error(
          `${progress} Error painting (${pixel.x}, ${pixel.y}): ${result.error} - ${result.reason}`
        );
      } else {
        console.log(
          `${progress} Painting (${pixel.x}, ${pixel.y}) → ${pixel.color} | txid: ${result.txid}`
        );
      }
    } catch (err) {
      console.error(
        `${progress} Failed to broadcast (${pixel.x}, ${pixel.y}):`,
        err instanceof Error ? err.message : err
      );
    }

    if (i < total - 1) {
      await waitMs(delayMs);
    }
  }

  const endTime = Date.now();
  console.log(`\nDone. ${total} pixels processed.`);
}
