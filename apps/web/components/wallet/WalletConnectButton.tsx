"use client";

import { connect, disconnect, getLocalStorage } from "@stacks/connect";
import { Button } from "../ui/Button";
import { truncateAddress } from "@/lib/stacks-utils";
import { useState } from "react";

interface WalletConnectButtonProps {
  onConnect?: (address: string | null) => void;
}

/**
 * Standardized wallet connection button with status tracking.
 */
export function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  const [address, setAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connect();
      const data = getLocalStorage();
      const stxAddress = data?.addresses?.stx?.[0]?.address;
      if (stxAddress) {
        setAddress(stxAddress);
        onConnect?.(stxAddress);
      }
    } catch (error) {
      console.warn("[wallet] connect failed", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    onConnect?.(null);
  };

  return (
    <Button
      variant={address ? "secondary" : "primary"}
      onClick={address ? handleDisconnect : handleConnect}
    >
      {address ? truncateAddress(address) : "CONNECT WALLET"}
    </Button>
  );
}
