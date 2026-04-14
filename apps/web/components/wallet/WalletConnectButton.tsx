"use client";

import { connect, getLocalStorage } from "@stacks/connect";
import { useState, useCallback } from "react";
import { DESIGN, APP_URL } from "@/lib/constants";

interface WalletConnectButtonProps {
  onConnect: (address: string) => void;
}

export function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  const [address, setAddress] = useState<string | null>(null);

  const truncateAddress = (addr: string): string =>
    `${addr.slice(0, 5)}…${addr.slice(-3)}`;

  const handleConnect = useCallback(async () => {
    try {
      await connect();
      const data = getLocalStorage();
      const stxAddress = data?.addresses?.stx?.[0]?.address;
      if (stxAddress) {
        setAddress(stxAddress);
        onConnect(stxAddress);
      }
    } catch {
      // user cancelled or wallet unavailable
    }
  }, [onConnect]);

  return (
    <button
      onClick={handleConnect}
      style={{
        padding: "8px 16px",
        border: `1px solid ${DESIGN.primaryNeon}`,
        boxShadow: `4px 4px 0px ${DESIGN.primaryNeon}`,
        background: "transparent",
        color: DESIGN.primaryNeon,
        fontFamily: DESIGN.fontDisplay,
        fontSize: 14,
        cursor: "pointer",
        transition: "transform 0.1s, box-shadow 0.1s",
        whiteSpace: "nowrap",
        letterSpacing: "0.05em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(2px, 2px)";
        e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.primaryNeon}`;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = `0px 0px 0px ${DESIGN.primaryNeon}`;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(2px, 2px)";
        e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
      }}
    >
      {address ? truncateAddress(address) : "Connect Wallet"}
    </button>
  );
}
