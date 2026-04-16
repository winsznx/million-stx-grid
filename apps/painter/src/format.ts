export function formatPixelLine(index: number, total: number, x: number, y: number, color: string): string {
  return `[${index + 1}/${total}] (${x}, ${y}) -> ${color}`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return `${minutes}m ${rem}s`;
}
