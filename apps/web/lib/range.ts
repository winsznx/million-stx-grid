export function range(start: number, end?: number, step = 1): number[] {
  const [from, to] = end === undefined ? [0, start] : [start, end];
  if (step === 0) throw new Error("Step must not be zero");
  const result: number[] = [];
  if (step > 0) {
    for (let i = from; i < to; i += step) result.push(i);
  } else {
    for (let i = from; i > to; i += step) result.push(i);
  }
  return result;
}
