"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { DESIGN } from "@/lib/constants";

/**
 * Neon checkbox component with custom styling.
 */
export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Checkbox(
  { className, ...props },
  ref
) {
  return (
    <input
      type="checkbox"
      ref={ref}
      className="w-4 h-4 rounded-none border border-muted bg-transparent appearance-none checked:bg-primary-neon checked:border-primary-neon focus:ring-0 cursor-pointer"
      style={{
        borderColor: DESIGN.textMuted,
      }}
      {...props}
    />
  );
});
