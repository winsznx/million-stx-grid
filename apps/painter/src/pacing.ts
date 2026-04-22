/**
 * Estimates the total duration in milliseconds for a given number of items with a fixed delay.
 * @param count - The number of items to process.
 * @param delayMs - The delay between each item in milliseconds.
 * @returns The estimated duration in milliseconds.
 */
export function estimateDurationMs(count: number, delayMs: number): number {
  if (count <= 0) return 0;
  return (count - 1) * delayMs;
}

/**
 * Estimates the completion date and time based on the item count and delay.
 * @param count - The number of items to process.
 * @param delayMs - The delay between each item in milliseconds.
 * @param nowMs - The starting timestamp in milliseconds (defaults to Date.now()).
 * @returns A Date object representing the estimated completion time.
 */
export function estimateCompletionTime(count: number, delayMs: number, nowMs: number = Date.now()): Date {
  return new Date(nowMs + estimateDurationMs(count, delayMs));
}
