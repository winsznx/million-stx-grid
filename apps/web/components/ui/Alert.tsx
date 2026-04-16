"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

type AlertTone = "info" | "success" | "warn" | "error";

interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
  className?: string;
}

const toneColor: Record<AlertTone, string> = {
  info: DESIGN.secondaryNeon,
  success: DESIGN.primaryNeon,
  warn: "#ffcc00",
  error: DESIGN.danger,
};

export function Alert({ tone = "info", title, children, className }: AlertProps) {
  const color = toneColor[tone];
  return (
    <div
      className={cn(className)}
      role="alert"
      style={{
        padding: "12px 16px",
        borderLeft: `3px solid ${color}`,
        background: "rgba(255,255,255,0.02)",
        color: DESIGN.textPrimary,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 13,
      }}
    >
      {title && (
        <div style={{ color, fontWeight: 700, marginBottom: 4 }}>{title}</div>
      )}
      {children}
    </div>
  );
}
