import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WalletConnectionProps {
  onConnect?: (address: string) => void;
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (typeof (window as any).ethereum !== 'undefined') {
        // Request account access
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          setIsConnected(true);
          onConnect?.(address);
        }
      } else {
        setError('MetaMask not detected. Please install MetaMask to continue.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <Card className="bg-card/50 border-border/30 backdrop-blur-md">
        <CardContent className="p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-sm font-medium">Wallet Connected</p>
            <p className="text-xs text-muted-foreground">{formatAddress(walletAddress)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        variant="ocean"
        size="lg"
        className={cn(
          "w-full",
          isConnecting && "animate-pulse"
        )}
      >
        <Wallet className="mr-2 h-5 w-5" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      
      {error && (
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}