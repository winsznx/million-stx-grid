/** Formats a number with locale-specific separators. */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

/** Formats a number in compact notation (e.g., 1.2K, 3.4M). */
export function formatCompact(n: number): string {
  if (n < 1_000) return n.toString();
  if (n < 1_000_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

/** Returns the correct singular or plural form. */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
