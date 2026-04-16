"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, style, onClear, value, ...props },
  ref
) {
  const hasValue = typeof value === "string" && value.length > 0;
  return (
    <div className={cn(className)} style={{ position: "relative", display: "inline-block" }}>
      <input
        ref={ref}
        type="search"
        value={value}
        style={{
          padding: "8px 28px 8px 12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.02)",
          color: DESIGN.textPrimary,
          fontFamily: DESIGN.fontDisplay,
          fontSize: 13,
          outline: "none",
          minWidth: 200,
          ...style,
        }}
        {...props}
      />
      {hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            color: DESIGN.textMuted,
            cursor: "pointer",
            padding: 2,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
});
