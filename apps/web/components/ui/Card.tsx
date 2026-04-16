"use client";

import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, style, children, padding = 20, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        padding,
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
