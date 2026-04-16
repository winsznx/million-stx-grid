"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "48px 24px",
        color: DESIGN.textMuted,
        fontFamily: DESIGN.fontDisplay,
        textAlign: "center",
      }}
    >
      <div style={{ color: DESIGN.textPrimary, fontSize: 16 }}>{title}</div>
      {description && <div style={{ fontSize: 13 }}>{description}</div>}
      {action && <div style={{ marginTop: 12 }}>{action}</div>}
    </div>
  );
}
