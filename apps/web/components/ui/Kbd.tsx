"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface KbdProps {
  children: ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(className)}
      style={{
        padding: "2px 6px",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.03)",
        color: DESIGN.textMuted,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 11,
      }}
    >
      {children}
    </kbd>
  );
}
