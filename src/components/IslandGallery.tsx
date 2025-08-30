import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Share2 } from "lucide-react";

interface IslandNFT {
  id: string;
  name: string;
  image: string;
  rarity: string;
  features: string[];
  mintDate: string;
}

export interface IslandGalleryProps {
  islands?: IslandNFT[];
}

// Mock data for demonstration
const mockIslands: IslandNFT[] = [
  {
    id: "1",
    name: "Mystic Reef Paradise",
    image: "/api/placeholder/300/300",
    rarity: "Legendary",
    features: ["Crystal Waters", "Ancient Forest", "Mystic Aura"],
    mintDate: "2024-01-15"
  },
  {
    id: "2", 
    name: "Volcanic Sanctuary",
    image: "/api/placeholder/300/300",
    rarity: "Epic",
    features: ["Volcanic Peak", "Crystal Waters"],
    mintDate: "2024-01-10"
  },
  {
    id: "3",
    name: "Emerald Atoll",
    image: "/api/placeholder/300/300", 
    rarity: "Rare",
    features: ["Ancient Forest", "Crystal Waters"],
    mintDate: "2024-01-05"
  }
];

const rarityColors = {
  "Common": "bg-secondary text-secondary-foreground",
  "Rare": "bg-primary text-primary-foreground",
  "Epic": "bg-accent text-accent-foreground", 
  "Legendary": "bg-gradient-sunset text-foreground"
};

export function IslandGallery({ islands = mockIslands }: IslandGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your Island Collection</h2>
        <p className="text-muted-foreground">
          Discover and manage your unique procedurally generated islands
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {islands.map((island) => (
          <Card
            key={island.id}
            className="bg-card/50 border-border/30 backdrop-blur-md hover:bg-card/70 transition-all duration-300 group"
          >
            <CardContent className="p-4">
              {/* Island Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-gradient-ocean aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={`${rarityColors[island.rarity as keyof typeof rarityColors]} text-xs`}
                  >
                    {island.rarity}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-foreground/50 text-sm">
                  Island Preview
                </div>
              </div>

              {/* Island Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{island.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Minted: {new Date(island.mintDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {island.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-background/50"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="glass"
                    size="sm"
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {islands.length === 0 && (
        <Card className="bg-card/30 border-border/20 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Islands Found</h3>
            <p className="text-muted-foreground">
              Connect your wallet and forge your first island to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}