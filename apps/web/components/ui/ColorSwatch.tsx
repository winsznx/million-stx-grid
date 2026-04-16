"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ColorSwatchProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  color: string;
  size?: number;
}

export function ColorSwatch({ color, size = 14, className, style, ...props }: ColorSwatchProps) {
  return (
    <span
      className={cn(className)}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        border: "1px solid rgba(255,255,255,0.2)",
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  );
}
