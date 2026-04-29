export function formatProgress(current: number, total: number): string {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const filled = Math.floor(pct / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  return `[${bar}] ${pct}% (${current}/${total})`;
}
