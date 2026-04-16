export function estimateDurationMs(count: number, delayMs: number): number {
  if (count <= 0) return 0;
  return (count - 1) * delayMs;
}

export function estimateCompletionTime(count: number, delayMs: number, nowMs: number = Date.now()): Date {
  return new Date(nowMs + estimateDurationMs(count, delayMs));
}
