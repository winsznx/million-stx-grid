"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface WalletContextValue {
  address: string | null;
  setAddress: (address: string | null) => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

/**
 * Provider for Stacks wallet state across the application.
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const value = useMemo<WalletContextValue>(
    () => ({ address, setAddress, isConnected: !!address }),
    [address]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

/**
 * Hook to access wallet state.
 */
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
