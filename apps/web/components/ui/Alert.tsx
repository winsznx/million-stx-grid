"use client";

import { DESIGN } from "@/lib/constants";

interface AlertProps {
  message: string;
  variant?: "info" | "error";
}

/**
 * Prominent alert box for critical feedback.
 */
export function Alert({ message, variant = "info" }: AlertProps) {
  const accent = variant === "error" ? DESIGN.danger : DESIGN.primaryNeon;
  return (
    <div
      className="p-3 border-l-4 text-sm"
      style={{
        background: `${accent}11`,
        borderLeftColor: accent,
        color: accent,
      }}
    >
      {message}
    </div>
  );
}
