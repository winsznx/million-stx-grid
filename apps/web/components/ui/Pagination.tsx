"use client";

import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";
import { clamp } from "@/lib/clamp";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const goto = (next: number) => onChange(clamp(next, 0, totalPages - 1));

  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 13,
        color: DESIGN.textPrimary,
      }}
    >
      <button
        type="button"
        onClick={() => goto(page - 1)}
        disabled={!canPrev}
        style={{
          padding: "4px 10px",
          background: "transparent",
          border: `1px solid ${DESIGN.textMuted}`,
          color: canPrev ? DESIGN.textPrimary : DESIGN.textMuted,
          cursor: canPrev ? "pointer" : "not-allowed",
        }}
      >
        ←
      </button>
      <span>{page + 1} / {totalPages}</span>
      <button
        type="button"
        onClick={() => goto(page + 1)}
        disabled={!canNext}
        style={{
          padding: "4px 10px",
          background: "transparent",
          border: `1px solid ${DESIGN.textMuted}`,
          color: canNext ? DESIGN.textPrimary : DESIGN.textMuted,
          cursor: canNext ? "pointer" : "not-allowed",
        }}
      >
        →
      </button>
    </div>
  );
}
