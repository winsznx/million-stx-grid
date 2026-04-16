"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  vertical?: boolean;
}

export function Divider({ vertical, className, style, ...props }: DividerProps) {
  return (
    <hr
      className={cn(className)}
      style={{
        border: "none",
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 1,
        background: "rgba(255,255,255,0.05)",
        ...style,
      }}
      {...props}
    />
  );
}
