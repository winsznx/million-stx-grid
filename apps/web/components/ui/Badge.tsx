"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "danger";
}

/**
 * A small status badge with neon aesthetics.
 */
export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
  const accent = variant === "secondary" ? DESIGN.secondaryNeon : variant === "danger" ? DESIGN.danger : DESIGN.primaryNeon;
  
  return (
    <span
      className={cn("px-2 py-0.5 text-xs font-bold uppercase tracking-wider", className)}
      style={{
        border: `1px solid ${accent}`,
        color: accent,
        backgroundColor: `${accent}22`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
