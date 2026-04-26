"use client";

interface CoordinateDisplayProps {
  x: number | null;
  y: number | null;
}

/**
 * Displays the current mouse coordinates on the grid.
 */
export function CoordinateDisplay({ x, y }: CoordinateDisplayProps) {
  return (
    <div className="font-mono text-xs text-white/60 bg-black/40 px-3 py-1 rounded-full border border-white/5">
      COORD: {x !== null && y !== null ? `(${x}, ${y})` : "---"}
    </div>
  );
}
