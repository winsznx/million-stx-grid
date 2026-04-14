"use client";

import { ButtonHTMLAttributes } from "react";
import { DESIGN } from "@/lib/constants";

interface HardShadowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function HardShadowButton({
  variant = "primary",
  style: styleProp,
  children,
  disabled,
  ...props
}: HardShadowButtonProps) {
  const accentColor = variant === "primary" ? DESIGN.primaryNeon : DESIGN.secondaryNeon;

  return (
    <button
      disabled={disabled}
      style={{
        padding: "10px 20px",
        border: `1px solid ${accentColor}`,
        boxShadow: disabled ? "none" : `4px 4px 0px ${accentColor}`,
        background: "transparent",
        color: disabled ? DESIGN.textMuted : accentColor,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 0.1s, box-shadow 0.1s",
        ...styleProp,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = `2px 2px 0px ${accentColor}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `4px 4px 0px ${accentColor}`;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translate(4px, 4px)";
          e.currentTarget.style.boxShadow = `0px 0px 0px ${accentColor}`;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = `2px 2px 0px ${accentColor}`;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
