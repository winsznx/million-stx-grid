"use client";

import { DESIGN } from "@/lib/constants";

interface CoordinateDisplayProps {
  x: number | null;
  y: number | null;
  painter: string | null;
}

export function CoordinateDisplay({ x, y, painter }: CoordinateDisplayProps) {
  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 5)}…${addr.slice(-3)}`;

  return (
    <div style={{ fontFamily: DESIGN.fontDisplay, fontSize: 14,
        letterSpacing: "0.05em" }}>
      <span style={{ color: DESIGN.textPrimary }}>
        X: {x ?? "—"}  Y: {y ?? "—"}
      </span>
      {painter && (
        <div style={{ color: DESIGN.textMuted, fontSize: 12, marginTop: 2,
          letterSpacing: "0.02em" }}>
          Last painted by: {truncateAddress(painter)}
        </div>
      )}
    </div>
  );
}
