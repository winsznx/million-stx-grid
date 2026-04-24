/**
 * Truncates a Stacks address for display.
 * @param address - The full Stacks address.
 * @param startLen - Number of characters to keep at the start.
 * @param endLen - Number of characters to keep at the end.
 * @returns A truncated string with an ellipsis.
 */
export function truncateAddress(address: string, startLen = 5, endLen = 3): string {
  if (!address) return "";
  if (address.length <= startLen + endLen + 1) return address;
  return `${address.slice(0, startLen)}…${address.slice(-endLen)}`;
}

/**
 * Checks if an address is a Mainnet address.
 */
export function isMainnetAddress(address: string): boolean {
  return typeof address === "string" && address.startsWith("SP");
}

/**
 * Checks if an address is a Testnet address.
 */
export function isTestnetAddress(address: string): boolean {
  return typeof address === "string" && address.startsWith("ST");
}
