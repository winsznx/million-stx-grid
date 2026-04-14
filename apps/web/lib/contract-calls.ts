import { openContractCall } from "@stacks/connect";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from "./constants";

export function callPaintPixel(
  x: number,
  y: number,
  color: string,
  onFinish: () => void,
  onCancel: () => void
): void {
  openContractCall({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: "paint-pixel",
    functionArgs: [uintCV(x), uintCV(y), stringAsciiCV(color)],
    network: new StacksMainnet(),
    onFinish,
    onCancel,
  });
}
