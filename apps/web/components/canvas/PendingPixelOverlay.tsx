"use client";

import { PIXEL_SIZE } from "@/lib/constants";

interface PendingPixel {
  x: number;
  y: number;
  color: string;
}

interface PendingPixelOverlayProps {
  pixels: PendingPixel[];
  zoom: number;
}

/**
 * Renders pixels that have been broadcasted but not yet confirmed on-chain.
 */
export function PendingPixelOverlay({ pixels, zoom }: PendingPixelOverlayProps) {
  if (pixels.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {pixels.map((pixel) => (
        <div
          key={`${pixel.x},${pixel.y}`}
          className="absolute animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          style={{
            left: pixel.x * PIXEL_SIZE,
            top: pixel.y * PIXEL_SIZE,
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: pixel.color,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
}
