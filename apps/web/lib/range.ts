/**
 * Generates an array of numbers in a range.
 * @param start - Start of range (or end if only one arg).
 * @param end - End of range (exclusive).
 * @param step - Step increment (must not be zero).
 */
export function range(start: number, end?: number, step = 1): readonly number[] {
  const [from, to] = end === undefined ? [0, start] : [start, end];
  if (step === 0) throw new RangeError("Step must not be zero");
  const result: number[] = [];
  if (step > 0) {
    for (let i = from; i < to; i += step) result.push(i);
  } else {
    for (let i = from; i > to; i += step) result.push(i);
  }
  return result;
}
