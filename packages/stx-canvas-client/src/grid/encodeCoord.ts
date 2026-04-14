export function encodeCoord(x: number, y: number): string {
  return `${x},${y}`;
}

export function decodeCoord(key: string): { x: number; y: number } {
  const sepIdx = key.indexOf(",");
  return {
    x: parseInt(key.substring(0, sepIdx), 10),
    y: parseInt(key.substring(sepIdx + 1), 10),
  };
}

export function isValidCoord(x: number, y: number, gridSize: number): boolean {
  return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

export function coordToIndex(x: number, y: number, gridSize: number): number {
  return y * gridSize + x;
}

export function indexToCoord(index: number, gridSize: number): { x: number; y: number } {
  return {
    x: index % gridSize,
    y: Math.floor(index / gridSize),
  };
}
