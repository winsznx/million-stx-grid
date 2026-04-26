"use client";

import { truncateAddress } from "@/lib/stacks-utils";

interface CoordinateDisplayProps {
  x: number | null;
  y: number | null;
  painter?: string | null;
}

/**
 * Displays the current mouse coordinates and painter address on the grid.
 */
export function CoordinateDisplay({ x, y, painter }: CoordinateDisplayProps) {
  return (
    <div className="font-mono text-xs text-white/60 bg-black/40 px-3 py-1 rounded-full border border-white/5">
      COORD: {x !== null && y !== null ? `(${x}, ${y})` : "---"}
      {painter && <span className="ml-2 opacity-50">| {truncateAddress(painter)}</span>}
    </div>
  );
}

