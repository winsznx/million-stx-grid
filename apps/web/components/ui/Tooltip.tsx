"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface TooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ text, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={cn(className)}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 8px",
            background: DESIGN.bg,
            border: `1px solid ${DESIGN.primaryNeon}`,
            color: DESIGN.textPrimary,
            fontFamily: DESIGN.fontDisplay,
            fontSize: 11,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
