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
