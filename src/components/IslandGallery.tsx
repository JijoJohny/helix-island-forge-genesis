import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Share2, Compass } from "lucide-react";

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
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-ocean bg-clip-text text-transparent">Your Island Collection</h2>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Discover and manage your unique procedurally generated islands
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {islands.map((island) => (
          <Card
            key={island.id}
            className="group bg-gradient-glass border-border/40 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] shadow-elevation hover:shadow-floating rounded-3xl overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Island Image */}
              <div className="relative aspect-square bg-gradient-ocean rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30" />
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    className={`${rarityColors[island.rarity as keyof typeof rarityColors]} text-xs px-3 py-1 rounded-full shadow-elevation`}
                  >
                    {island.rarity}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-foreground/10 backdrop-blur-sm flex items-center justify-center">
                      <Compass className="h-10 w-10 text-foreground/70" />
                    </div>
                    <p className="text-sm text-foreground/80 font-medium">Island Preview</p>
                  </div>
                </div>
              </div>

              {/* Island Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl mb-1">{island.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Minted: {new Date(island.mintDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {island.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-background/30 border-border/30 rounded-full px-3 py-1"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <Button
                    variant="glass"
                    size="sm"
                    className="rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    className="rounded-xl"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl hover:bg-background/40"
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
        <Card className="bg-gradient-glass border-border/30 backdrop-blur-xl shadow-elevation rounded-3xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-muted/20 flex items-center justify-center">
              <Eye className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Islands Found</h3>
            <p className="text-lg text-muted-foreground font-light max-w-md mx-auto">
              Connect your wallet and forge your first island to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}