"use client";

import { RefObject, useEffect, useState } from "react";

export function useIntersection<T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry?.isIntersecting ?? false);
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);

  return visible;
}
