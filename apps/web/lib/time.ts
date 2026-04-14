export function blocksToMinutes(blocks: number): number {
  return blocks * 10;
}

export function timeAgoFromBlocks(blocksDiff: number): string {
  const minutes = blocksToMinutes(blocksDiff);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
