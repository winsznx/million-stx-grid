export function truncateAddress(address: string, startLen = 5, endLen = 3): string {
  if (address.length <= startLen + endLen + 1) return address;
  return `${address.slice(0, startLen)}…${address.slice(-endLen)}`;
}

export function isMainnetAddress(address: string): boolean {
  return address.startsWith("SP");
}

export function isTestnetAddress(address: string): boolean {
  return address.startsWith("ST");
}
