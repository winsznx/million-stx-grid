"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(className)}
        style={{
          minWidth: 320,
          maxWidth: "90vw",
          padding: 24,
          background: DESIGN.bg,
          border: `1px solid ${DESIGN.primaryNeon}`,
          boxShadow: `8px 8px 0px ${DESIGN.primaryNeon}`,
          fontFamily: DESIGN.fontDisplay,
          color: DESIGN.textPrimary,
        }}
      >
        {title && (
          <h2 style={{ margin: 0, marginBottom: 12, color: DESIGN.primaryNeon, fontSize: 18 }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
