import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WalletConnection } from "@/components/WalletConnection";
import { IslandForge } from "@/components/IslandForge";
import { IslandGallery } from "@/components/IslandGallery";
import { BrandCollection } from "@/components/BrandCollection";
import { Anchor, Waves, Github, Twitter } from "lucide-react";
import heroIsland from "@/assets/hero-island.jpg";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"forge" | "gallery" | "brands">("forge");

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setConnectedAddress(address);
  };

  return (
    <div className="min-h-screen bg-gradient-deep">
      {/* Navigation */}
      <nav className="border-b border-border/20 backdrop-blur-md bg-background/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Island Forge
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroIsland})` }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-ocean bg-clip-text text-transparent">
              Island Forge
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Generate unique procedural islands as NFTs based on your blockchain inventory. 
              Every island tells your story.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <Waves className="h-6 w-6 text-primary animate-bounce" style={{ animationDelay: "0s" }} />
              <Waves className="h-8 w-8 text-primary/70 animate-bounce" style={{ animationDelay: "0.5s" }} />
              <Waves className="h-6 w-6 text-primary animate-bounce" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Wallet Connection Card */}
          <div className="max-w-md mx-auto mb-8">
            <WalletConnection onConnect={handleWalletConnect} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <Card className="bg-card/30 border-border/20 backdrop-blur-md">
              <CardContent className="p-2 flex gap-1">
                <Button
                  variant={activeTab === "forge" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("forge")}
                  size="sm"
                >
                  Forge Islands
                </Button>
                <Button
                  variant={activeTab === "gallery" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("gallery")}
                  size="sm"
                >
                  My Collection
                </Button>
                <Button
                  variant={activeTab === "brands" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("brands")}
                  size="sm"
                >
                  Brand Collections
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "forge" ? (
              <IslandForge 
                isConnected={isWalletConnected}
                onGenerate={() => setActiveTab("gallery")}
              />
            ) : activeTab === "gallery" ? (
              <IslandGallery />
            ) : (
              <BrandCollection 
                isConnected={isWalletConnected}
                connectedAddress={connectedAddress}
              />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-background/10 backdrop-blur-md py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            Built on Avalanche C-Chain • Powered by IPFS • Secured by Web3
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
