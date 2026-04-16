export const NetworkId = {
  Mainnet: "mainnet",
  Testnet: "testnet",
} as const;

export type NetworkId = (typeof NetworkId)[keyof typeof NetworkId];

export const TxStatus = {
  Pending: "pending",
  Success: "success",
  Failed: "failed",
  Abort: "abort_by_response",
} as const;

export type TxStatus = (typeof TxStatus)[keyof typeof TxStatus];
