"use client";

import { DESIGN } from "@/lib/constants";

interface BadgeProps {
  text: string;
  color?: string;
}

export function Badge({ text, color = DESIGN.primaryNeon }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        border: `1px solid ${color}`,
        color,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 10,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  );
}
