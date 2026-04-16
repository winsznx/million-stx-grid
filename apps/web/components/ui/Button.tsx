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
  if (variant === "secondary") return DESIGN.secondaryNeon;
  if (variant === "danger") return DESIGN.danger;
  return DESIGN.primaryNeon;
};

const paddingFor = (size: ButtonSize): string => {
  if (size === "sm") return "6px 12px";
  if (size === "lg") return "14px 28px";
  return "10px 20px";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, style, disabled, children, ...props },
  ref
) {
  const accent = accentFor(variant);
  const isGhost = variant === "ghost";

  return (
    <button
      ref={ref}
      className={cn(className)}
      disabled={disabled}
      style={{
        padding: paddingFor(size),
        border: `1px solid ${accent}`,
        boxShadow: disabled || isGhost ? "none" : `4px 4px 0px ${accent}`,
        background: "transparent",
        color: disabled ? DESIGN.textMuted : accent,
        fontFamily: DESIGN.fontDisplay,
        fontSize: size === "sm" ? 12 : size === "lg" ? 16 : 14,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 0.1s, box-shadow 0.1s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
});
