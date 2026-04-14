"use client";

import { DESIGN } from "@/lib/constants";

interface SelectedPixelInfoProps {
  x: number;
  y: number;
  color: string;
}

export function SelectedPixelInfo({ x, y, color }: SelectedPixelInfoProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 12,
        color: DESIGN.textPrimary,
      }}
    >
      <span>Target: ({x}, {y})</span>
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          backgroundColor: color,
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
