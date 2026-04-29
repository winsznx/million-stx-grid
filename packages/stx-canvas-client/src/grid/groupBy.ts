/**
 * Groups items by a computed key.
 * @param items - The array to group.
 * @param keyFn - Function that extracts the grouping key.
 * @returns A Map of keys to arrays of items.
 */
export function groupBy<T, K extends string | number>(
  items: readonly T[],
  keyFn: (item: T) => K
): ReadonlyMap<K, readonly T[]> {
  const result = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const bucket = result.get(key);
    if (bucket) bucket.push(item);
    else result.set(key, [item]);
  }
  return result;
}
