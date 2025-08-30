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
    <div className="space-y-10">
      {/* Brand Header */}
      <Card className="bg-gradient-glass border-border/40 backdrop-blur-xl shadow-floating rounded-3xl overflow-hidden">
        <CardHeader className="text-center py-10 bg-gradient-to-br from-background/20 to-transparent">
          <CardTitle className="text-4xl font-bold bg-gradient-sunset bg-clip-text text-transparent mb-4">
            {brandData.name} Collection
          </CardTitle>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">{brandData.description}</p>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Collection Progress</span>
              <span className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">{ownedCount}/{brandData.requiredCount}</span>
            </div>
            <Progress value={progressPercentage} className="h-4 rounded-full shadow-elevation" />
          </div>

          {/* Master NFT Claim Section */}
          {hasMasterNFT ? (
            <Card className="bg-gradient-sunset/10 border-accent/40 rounded-2xl shadow-elevation">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Crown className="h-10 w-10 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-accent mb-2">Master NFT Claimed!</h4>
                <p className="text-base text-muted-foreground font-medium">
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
              className="w-full h-16 rounded-2xl text-lg font-semibold shadow-floating hover:shadow-glow-ocean transition-all duration-300"
            >
              <Crown className="mr-3 h-6 w-6" />
              {isClaimingMaster ? "Claiming Master NFT..." : 
               canClaimMaster ? "Claim Master NFT" : 
               `Collect ${brandData.requiredCount - ownedCount} more NFTs to unlock`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* NFT Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {brandData.nfts.map((nft) => {
          const isOwned = ownedNFTs.some(owned => owned.id === nft.id);
          
          return (
            <Card
              key={nft.id}
              className={cn(
                "group relative transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden",
                isOwned 
                  ? "bg-gradient-glass border-border/40 backdrop-blur-xl shadow-elevation hover:shadow-floating" 
                  : "bg-background/20 border-border/20 backdrop-blur-sm opacity-60 hover:opacity-80"
              )}
            >
              <CardContent className="p-4">
                {/* NFT Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-ocean">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto rounded-lg bg-foreground/20 flex items-center justify-center mb-2">
                        <span className="text-xs font-bold text-foreground/70">#{nft.id.split('-')[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ownership Status */}
                  <div className="absolute top-2 right-2">
                    {isOwned ? (
                      <div className="p-1 rounded-full bg-secondary/20 shadow-elevation">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full bg-background/20">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Rarity Badge */}
                  <div className="absolute bottom-2 left-2">
                    <Badge
                      className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} text-xs px-2 py-1 rounded-full shadow-elevation`}
                    >
                      {nft.rarity}
                    </Badge>
                  </div>
                </div>

                {/* NFT Name */}
                <h4 className="text-xs font-semibold truncate mb-2 text-center">{nft.name}</h4>

                {/* Action Button */}
                {!isOwned && (
                  <Button
                    onClick={() => handleBuyNFT(nft.id)}
                    variant="glass"
                    size="sm"
                    className="w-full h-8 text-xs rounded-xl"
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
        <Card className="bg-gradient-sunset/5 border-accent/30 backdrop-blur-xl shadow-floating rounded-3xl overflow-hidden">
          <CardHeader className="py-8">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <div className="p-3 rounded-2xl bg-accent/20 shadow-elevation">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              Master NFT Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square rounded-3xl bg-gradient-sunset/20 shadow-elevation flex items-center justify-center">
                <Crown className="h-24 w-24 text-accent/50" />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{brandData.masterNFT.name}</h3>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    {brandData.masterNFT.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Exclusive Benefits:</h4>
                  <ul className="space-y-3">
                    {brandData.masterNFT.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="p-1 rounded-full bg-secondary/20">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="font-medium">{benefit}</span>
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