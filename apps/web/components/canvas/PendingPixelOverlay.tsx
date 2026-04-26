"use client";

import { PIXEL_SIZE } from "@/lib/constants";

interface PendingPixelOverlayProps {
  pending: Map<string, string>;
}

/**
 * Renders pixels that have been broadcasted but not yet confirmed on-chain.
 */
export function PendingPixelOverlay({ pending }: PendingPixelOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from(pending.entries()).map(([key, color]) => {
        const [x, y] = key.split(",").map(Number);
        return (
          <div
            key={key}
            className="absolute animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            style={{
              left: x * PIXEL_SIZE,
              top: y * PIXEL_SIZE,
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              backgroundColor: color,
              zIndex: 10,
            }}
          />
        );
      })}
    </div>
  );
}
