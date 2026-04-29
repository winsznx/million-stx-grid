/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The input value.
 * @param min - Lower bound.
 * @param max - Upper bound.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new RangeError("min must be <= max");
  return Math.max(min, Math.min(max, value));
}
