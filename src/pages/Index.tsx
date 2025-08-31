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
    <div className="min-h-screen bg-gradient-deep relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/30 backdrop-blur-xl bg-background/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-ocean shadow-glow-ocean">
              <Anchor className="h-6 w-6 text-primary-foreground animate-float" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Island Forge
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-background/40">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-background/40">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroIsland})` }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-ocean bg-clip-text text-transparent leading-tight">
              Island Forge
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Generate unique procedural islands as NFTs based on your blockchain inventory. 
              Every island tells your story.
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
                <Waves className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: "0s" }} />
              </div>
              <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm">
                <Waves className="h-10 w-10 text-primary animate-bounce" style={{ animationDelay: "0.5s" }} />
              </div>
              <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
                <Waves className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>

          {/* Wallet Connection Card */}
          <div className="max-w-lg mx-auto mb-12">
            <WalletConnection onConnect={handleWalletConnect} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <Card className="bg-gradient-glass border-border/30 backdrop-blur-xl shadow-glass">
              <CardContent className="p-3 flex gap-2">
                <Button
                  variant={activeTab === "forge" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("forge")}
                  size="lg"
                  className="rounded-xl px-8 py-4 text-base font-medium"
                >
                  Forge Islands
                </Button>
                <Button
                  variant={activeTab === "gallery" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("gallery")}
                  size="lg"
                  className="rounded-xl px-8 py-4 text-base font-medium"
                >
                  My Collection
                </Button>
                <Button
                  variant={activeTab === "brands" ? "ocean" : "ghost"}
                  onClick={() => setActiveTab("brands")}
                  size="lg"
                  className="rounded-xl px-8 py-4 text-base font-medium"
                >
                  Brand Collections
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto">
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
      <footer className="relative border-t border-border/30 bg-gradient-glass backdrop-blur-xl py-12 px-6 mt-24">
        <div className="container mx-auto text-center">
          <p className="text-lg text-muted-foreground font-light">
            Built on <span className="text-primary font-medium">Avalanche C-Chain</span> • 
            Powered by <span className="text-secondary font-medium">IPFS</span> • 
            Secured by <span className="text-accent font-medium">Web3</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
