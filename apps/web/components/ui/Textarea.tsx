"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

/**
 * Neon-styled Textarea with consistent typography.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full bg-transparent p-2 outline-none border transition-colors focus:border-primary-neon resize-none",
        className
      )}
      style={{
        border: `1px solid ${DESIGN.textMuted}`,
        color: DESIGN.textPrimary,
        fontFamily: DESIGN.fontBody,
        minHeight: 80,
      }}
      {...props}
    />
  );
});
