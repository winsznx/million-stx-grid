"use client";

import { DESIGN } from "@/lib/constants";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
}

export function StatCard({ value, label, color = DESIGN.primaryNeon }: StatCardProps) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          fontFamily: DESIGN.fontDisplay,
          fontSize: 32,
          color,
        }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div
        style={{
          fontFamily: DESIGN.fontBody,
          fontSize: 14,
          color: DESIGN.textMuted,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}
