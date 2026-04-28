/**
 * Formats a Stacks address by truncating the middle part.
 * Useful for UI elements where space is limited.
 */
export function formatAddress(address: string): string {
  if (!address) return "Unknown";
  if (address.length < 10) return address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

/**
 * Returns a human-readable label for a principal if available.
 */
export function getPrincipalLabel(principal: string): string {
  if (principal.includes(".")) return principal.split(".")[1];
  return formatAddress(principal);
}

/**
 * Compact 4/4 truncation with an ellipsis. Returns the original input when it
 * is short enough to display in full.
 */
export function shortAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 9) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

/**
 * Wider 8/4 truncation for slots that can fit a longer prefix.
 */
export function mediumAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 13) return address;
  return `${address.slice(0, 8)}…${address.slice(-4)}`;
}

/**
 * Normalizes an address by trimming surrounding whitespace and uppercasing.
 */
export function fullAddress(address: string): string {
  return address.trim().toUpperCase();
}
