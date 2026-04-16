"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, style, invalid, ...props },
  ref
) {
  return (
    <textarea
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
        resize: "vertical",
        minHeight: 80,
        ...style,
      }}
      {...props}
    />
  );
});
