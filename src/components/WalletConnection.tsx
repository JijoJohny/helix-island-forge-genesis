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
      <Card className="bg-gradient-glass border-border/40 backdrop-blur-xl shadow-floating rounded-2xl">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-secondary/20 shadow-elevation">
            <CheckCircle className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-foreground">Wallet Connected</p>
            <p className="text-sm text-muted-foreground font-mono">{formatAddress(walletAddress)}</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        variant="ocean"
        size="lg"
        className={cn(
          "w-full h-14 rounded-2xl text-base font-semibold shadow-floating hover:shadow-glow-ocean transition-all duration-300",
          isConnecting && "animate-pulse"
        )}
      >
        <Wallet className="mr-3 h-6 w-6" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      
      {error && (
        <Card className="bg-destructive/10 border-destructive/30 rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}