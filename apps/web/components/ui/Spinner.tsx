"use client";

import { DESIGN } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(className)}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `2px solid ${DESIGN.textMuted}`,
        borderTopColor: DESIGN.primaryNeon,
        borderRadius: "50%",
        animation: "stxSpin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes stxSpin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}
