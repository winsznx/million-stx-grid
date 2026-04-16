"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, style, invalid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(className)}
      style={{
        padding: "8px 12px",
        border: `1px solid ${invalid ? DESIGN.danger : "rgba(255,255,255,0.15)"}`,
        background: "rgba(255,255,255,0.02)",
        color: DESIGN.textPrimary,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 13,
        outline: "none",
        ...style,
      }}
      {...props}
    />
  );
});
