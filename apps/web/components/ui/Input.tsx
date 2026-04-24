"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

/**
 * Custom styled input with neon focus state.
 */
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-transparent p-2 outline-none border transition-colors focus:border-primary-neon",
        className
      )}
      style={{
        border: `1px solid ${DESIGN.textMuted}`,
        color: DESIGN.textPrimary,
        fontFamily: DESIGN.fontBody,
      }}
      {...props}
    />
  );
});
