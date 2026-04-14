"use client";

import { ReactNode, useState } from "react";
import { DESIGN } from "@/lib/constants";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 8px",
            background: DESIGN.bg,
            border: "1px solid rgba(255,255,255,0.1)",
            color: DESIGN.textPrimary,
            fontFamily: DESIGN.fontDisplay,
            fontSize: 11,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
