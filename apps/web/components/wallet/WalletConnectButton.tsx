"use client";

import { useWallet } from "./WalletProvider";
import { Button } from "../ui/Button";
import { truncateAddress } from "@/lib/stacks-utils";

/**
 * Standardized wallet connection button with status tracking.
 */
export function WalletConnectButton() {
  const { address, setAddress } = useWallet();

  const handleConnect = () => {
    // Mock connection for now
    setAddress("SP2J7W7S227S0N0V2S6S7G0H2V6S7G0H2V6S7G0H");
  };

  const handleDisconnect = () => {
    setAddress(null);
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
