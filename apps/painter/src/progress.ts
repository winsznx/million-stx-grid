export function formatProgress(current: number, total: number): string {
  const pct = Math.round((current / total) * 100);
  const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  return `[${bar}] ${pct}% (${current}/${total})`;
}
