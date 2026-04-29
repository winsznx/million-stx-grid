/**
 * Splits an array into chunks of a given size.
 * @param arr - The source array.
 * @param size - Maximum chunk length.
 * @returns An array of chunks.
 */
export function chunk<T>(arr: readonly T[], size: number): readonly T[][] {
  if (size <= 0) throw new RangeError("Chunk size must be positive");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
