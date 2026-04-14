export function encodeCoord(x: number, y: number): string {
  return `${x},${y}`;
}

export function decodeCoord(key: string): { x: number; y: number } {
  const [xStr, yStr] = key.split(",");
  return { x: parseInt(xStr, 10), y: parseInt(yStr, 10) };
}
