"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, style, label, id, ...props },
  ref
) {
  return (
    <label
      className={cn(className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 13,
        color: DESIGN.textPrimary,
        cursor: "pointer",
      }}
    >
      <input
        ref={ref}
        type="checkbox"
        id={id}
        style={{
          accentColor: DESIGN.primaryNeon,
          cursor: "pointer",
          ...style,
        }}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
});
