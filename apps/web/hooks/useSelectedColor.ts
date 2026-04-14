import { useState, useCallback } from "react";
import { COLOR_PALETTE } from "@/lib/constants";

export function useSelectedColor(initialIndex: number = 17) {
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[initialIndex]);

  const selectColor = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  return { selectedColor, selectColor };
}
