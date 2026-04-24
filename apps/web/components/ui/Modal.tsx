"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card } from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * Portal-based Modal component with focus trapping and backdrop.
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-200">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
      </Card>
    </div>,
    document.body
  );
}
