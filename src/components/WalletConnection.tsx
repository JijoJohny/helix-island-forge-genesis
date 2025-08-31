import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnection({ isConnected, onConnect, onDisconnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConnect();
    setIsConnecting(false);
  };

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="bg-neu-base border border-border/20 shadow-neu-raised rounded-xl px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full shadow-glow-mystic animate-pulse-soft" />
              <span className="text-sm font-medium text-foreground">0x1234...5678</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDisconnect}
            className="text-muted-foreground hover:text-foreground"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={handleConnect}
          disabled={isConnecting}
          className="shadow-neu-raised hover:shadow-glow-mystic"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </div>
  );
}