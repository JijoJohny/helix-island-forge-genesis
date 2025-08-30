import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Crown, ShoppingCart, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface NFTItem {
  id: string;
  name: string;
  image: string;
  owned: boolean;
  rarity: string;
}

interface BrandCollectionProps {
  isConnected: boolean;
  connectedAddress?: string | null;
}

// Mock brand data
const brandData = {
  name: "Kinder Joy",
  description: "Collect all 24 exclusive Kinder Joy NFTs to unlock the legendary Master NFT!",
  masterNFT: {
    name: "Golden Kinder Master",
    description: "The ultimate Kinder Joy collectible - only available to those who own the complete set.",
    image: "/api/placeholder/400/400",
    benefits: ["Exclusive access to future drops", "VIP community access", "Special rewards"]
  },
  requiredCount: 24,
  nfts: Array.from({ length: 24 }, (_, i) => ({
    id: `kinder-${i + 1}`,
    name: `Kinder Joy #${i + 1}`,
    image: "/api/placeholder/200/200",
    owned: Math.random() > 0.7, // Random ownership for demo
    rarity: ["Common", "Rare", "Epic"][Math.floor(Math.random() * 3)]
  }))
};

const rarityColors = {
  "Common": "bg-secondary text-secondary-foreground",
  "Rare": "bg-primary text-primary-foreground",
  "Epic": "bg-accent text-accent-foreground"
};

export function BrandCollection({ isConnected, connectedAddress }: BrandCollectionProps) {
  const [ownedNFTs, setOwnedNFTs] = useState<NFTItem[]>([]);
  const [isClaimingMaster, setIsClaimingMaster] = useState(false);
  const [hasMasterNFT, setHasMasterNFT] = useState(false);

  useEffect(() => {
    if (isConnected && connectedAddress) {
      // Simulate checking wallet for owned NFTs
      setOwnedNFTs(brandData.nfts.filter(nft => nft.owned));
    }
  }, [isConnected, connectedAddress]);

  const ownedCount = ownedNFTs.length;
  const progressPercentage = (ownedCount / brandData.requiredCount) * 100;
  const canClaimMaster = ownedCount >= brandData.requiredCount && !hasMasterNFT;

  const handleClaimMaster = async () => {
    if (!canClaimMaster) return;
    
    setIsClaimingMaster(true);
    
    // Simulate smart contract call
    setTimeout(() => {
      setHasMasterNFT(true);
      setIsClaimingMaster(false);
    }, 3000);
  };

  const handleBuyNFT = (nftId: string) => {
    // Simulate buying/acquiring NFT
    const updatedNFTs = brandData.nfts.map(nft => 
      nft.id === nftId ? { ...nft, owned: true } : nft
    );
    setOwnedNFTs(updatedNFTs.filter(nft => nft.owned));
  };

  if (!isConnected) {
    return (
      <Card className="bg-card/30 border-border/20 backdrop-blur-md">
        <CardContent className="p-8 text-center">
          <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground">
            Connect your wallet to view and collect brand NFTs
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Brand Header */}
      <Card className="bg-card/50 border-border/30 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            {brandData.name} Collection
          </CardTitle>
          <p className="text-muted-foreground">{brandData.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collection Progress</span>
              <span className="font-medium">{ownedCount}/{brandData.requiredCount}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Master NFT Claim Section */}
          {hasMasterNFT ? (
            <Card className="bg-gradient-sunset/10 border-accent/30">
              <CardContent className="p-4 text-center">
                <Crown className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h4 className="font-semibold text-accent">Master NFT Claimed!</h4>
                <p className="text-sm text-muted-foreground">
                  You now own the exclusive {brandData.masterNFT.name}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={handleClaimMaster}
              disabled={!canClaimMaster || isClaimingMaster}
              variant={canClaimMaster ? "ocean" : "outline"}
              size="lg"
              className="w-full"
            >
              <Crown className="mr-2 h-5 w-5" />
              {isClaimingMaster ? "Claiming Master NFT..." : 
               canClaimMaster ? "Claim Master NFT" : 
               `Collect ${brandData.requiredCount - ownedCount} more NFTs to unlock`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* NFT Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brandData.nfts.map((nft) => {
          const isOwned = ownedNFTs.some(owned => owned.id === nft.id);
          
          return (
            <Card
              key={nft.id}
              className={cn(
                "relative transition-all duration-300 hover:scale-105",
                isOwned 
                  ? "bg-card/50 border-border/30 backdrop-blur-md" 
                  : "bg-card/20 border-border/10 backdrop-blur-sm opacity-60"
              )}
            >
              <CardContent className="p-3">
                {/* NFT Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-gradient-ocean">
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-xs">
                    NFT #{nft.id.split('-')[1]}
                  </div>
                  
                  {/* Ownership Status */}
                  <div className="absolute top-1 right-1">
                    {isOwned ? (
                      <CheckCircle className="h-4 w-4 text-secondary" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Rarity Badge */}
                  <div className="absolute bottom-1 left-1">
                    <Badge
                      className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-xs px-1 py-0`}
                    >
                      {nft.rarity}
                    </Badge>
                  </div>
                </div>

                {/* NFT Name */}
                <h4 className="text-xs font-medium truncate">{nft.name}</h4>

                {/* Action Button */}
                {!isOwned && (
                  <Button
                    onClick={() => handleBuyNFT(nft.id)}
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-6 text-xs"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Master NFT Preview */}
      {canClaimMaster || hasMasterNFT ? (
        <Card className="bg-gradient-sunset/5 border-accent/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              Master NFT Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-lg bg-gradient-sunset/20 flex items-center justify-center">
                <Crown className="h-16 w-16 text-accent/50" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{brandData.masterNFT.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {brandData.masterNFT.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Exclusive Benefits:</h4>
                  <ul className="space-y-1">
                    {brandData.masterNFT.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-secondary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}