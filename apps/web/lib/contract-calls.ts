import { request } from "@stacks/connect";
import { Cl } from "@stacks/transactions";
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from "./constants";

export async function callPaintPixel(
  x: number,
  y: number,
  color: string,
  onFinish: () => void,
  onCancel: () => void
): Promise<void> {
  try {
    const response = await request("stx_callContract", {
      contract: `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`,
      functionName: "paint-pixel",
      functionArgs: [Cl.uint(x), Cl.uint(y), Cl.stringAscii(color)],
      network: "mainnet",
    });
    if (response.txid) {
      onFinish();
    }
  } catch {
    onCancel();
  }
}
