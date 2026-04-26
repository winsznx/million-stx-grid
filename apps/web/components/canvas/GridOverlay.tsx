"use client";

import { GRID_SIZE, PIXEL_SIZE, CANVAS_SIZE } from "@/lib/constants";

/**
 * Optional grid line overlay for better visibility at high zoom levels.
 */
export function GridOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: `${PIXEL_SIZE}px ${PIXEL_SIZE}px`,
      }}
    />
  );
}
