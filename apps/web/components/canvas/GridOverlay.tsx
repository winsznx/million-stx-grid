"use client";

import { GRID_SIZE, PIXEL_SIZE, CANVAS_SIZE, DESIGN } from "@/lib/constants";

interface GridOverlayProps {
  visible: boolean;
  zoom: number;
}

export function GridOverlay({ visible, zoom }: GridOverlayProps) {
  if (!visible || zoom < 4) return null;

  return (
    <svg
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity: 0.15,
        transformOrigin: "top left",
        transform: `scale(${zoom})`,
      }}
    >
      {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * PIXEL_SIZE} y1={0}
          x2={i * PIXEL_SIZE} y2={CANVAS_SIZE}
          stroke={DESIGN.textMuted} strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0} y1={i * PIXEL_SIZE}
          x2={CANVAS_SIZE} y2={i * PIXEL_SIZE}
          stroke={DESIGN.textMuted} strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}
