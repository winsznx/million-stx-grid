"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "primary" | "secondary" | "danger";
}

export function Badge({ children, tone = "primary", className, style, ...props }: BadgeProps) {
  const color =
    tone === "danger"
      ? DESIGN.danger
      : tone === "secondary"
        ? DESIGN.secondaryNeon
        : DESIGN.primaryNeon;

  return (
    <span
      className={cn(className)}
      style={{
        display: "inline-block",
        padding: "2px 8px",
        border: `1px solid ${color}`,
        color,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 11,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
