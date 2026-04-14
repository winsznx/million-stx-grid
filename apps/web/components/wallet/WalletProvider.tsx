"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextValue {
  address: string | null;
  setAddress: (address: string | null) => void;
}

const WalletContext = createContext<WalletContextValue>({
  address: null,
  setAddress: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
}
