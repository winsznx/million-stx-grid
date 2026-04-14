"use client";

import { PIXEL_SIZE, DESIGN } from "@/lib/constants";

interface PendingPixel {
  x: number;
  y: number;
  color: string;
}

interface PendingPixelOverlayProps {
  pixels: PendingPixel[];
  zoom: number;
}

export function PendingPixelOverlay({ pixels, zoom }: PendingPixelOverlayProps) {
  if (pixels.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        transformOrigin: "top left",
        transform: `scale(${zoom})`,
      }}
    >
      {pixels.map((pixel) => (
        <div
          key={`${pixel.x},${pixel.y}`}
          style={{
            position: "absolute",
            left: pixel.x * PIXEL_SIZE,
            top: pixel.y * PIXEL_SIZE,
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: pixel.color,
            opacity: 0.5,
            border: `1px dashed ${DESIGN.primaryNeon}`,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
