"use client";

import { useCallback, useState } from "react";

export function useKeyedState<K extends string, V>(initial: Record<K, V>): {
  state: Record<K, V>;
  set: (key: K, value: V) => void;
  reset: () => void;
} {
  const [state, setState] = useState(initial);

  const set = useCallback((key: K, value: V) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setState(initial), [initial]);

  return { state, set, reset };
}
