/**
 * Formats a pixel instruction progress line for console output.
 * @param index - The current pixel index (0-indexed).
 * @param total - The total number of pixels.
 * @param x - The X coordinate.
 * @param y - The Y coordinate.
 * @param color - The hex color.
 * @returns A formatted progress string.
 */
export function formatPixelLine(index: number, total: number, x: number, y: number, color: string): string {
  const progress = `[${index + 1}/${total}]`.padEnd(String(total).length * 2 + 3);
  return `${progress} (${x}, ${y}) -> ${color}`;
}

/**
 * Formats a duration in milliseconds into a human-readable string.
 * @param ms - The duration in milliseconds.
 * @returns A formatted duration string (e.g., "2h 5m 10s" or "45s").
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remSeconds}s`;

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return `${hours}h ${remMinutes}m ${remSeconds}s`;
}
