"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const accentFor = (variant: ButtonVariant): string => {
  switch (variant) {
    case "secondary": return DESIGN.secondaryNeon;
    case "danger": return DESIGN.danger;
    case "ghost": return "transparent";
    default: return DESIGN.primaryNeon;
  }
};

/**
 * A reusable button component with custom neon styling.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, style, disabled, children, ...props },
  ref
) {
  const accent = accentFor(variant);
  const isGhost = variant === "ghost";

  return (
    <button
      ref={ref}
      className={cn(
        "transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
      style={{
        padding: size === "sm" ? "6px 12px" : size === "lg" ? "14px 28px" : "10px 20px",
        border: `1px solid ${isGhost ? DESIGN.textMuted : accent}`,
        boxShadow: disabled || isGhost ? "none" : `4px 4px 0px ${accent}`,
        background: "transparent",
        color: disabled ? DESIGN.textMuted : isGhost ? DESIGN.textPrimary : accent,
        fontFamily: DESIGN.fontDisplay,
        fontSize: size === "sm" ? 12 : size === "lg" ? 16 : 14,
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
});
