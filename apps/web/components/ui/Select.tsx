"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, style, options, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(className)}
      style={{
        padding: "8px 12px",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.02)",
        color: DESIGN.textPrimary,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 13,
        cursor: "pointer",
        outline: "none",
        ...style,
      }}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});
