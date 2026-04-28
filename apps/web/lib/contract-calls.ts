import { request } from "@stacks/connect";
import { Cl } from "@stacks/transactions";
import { CONTRACT_DEPLOYER, CONTRACT_NAME, NETWORK_TYPE } from "./constants";

type StacksConnectNetwork = "mainnet" | "testnet" | "devnet" | "mocknet";

function resolveNetwork(): StacksConnectNetwork {
  if (NETWORK_TYPE === "testnet" || NETWORK_TYPE === "devnet" || NETWORK_TYPE === "mocknet") {
    return NETWORK_TYPE;
  }
  return "mainnet";
}

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
      network: resolveNetwork(),
    });
    if (response.txid) {
      onFinish();
    } else {
      onCancel();
    }
  } catch (error) {
    console.warn("[contract-calls] paint-pixel call failed", error);
    onCancel();
  }
}
