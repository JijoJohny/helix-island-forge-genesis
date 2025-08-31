import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WalletConnection } from "@/components/WalletConnection";
import { IslandForge } from "@/components/IslandForge";
import { IslandGallery } from "@/components/IslandGallery";
import { BrandCollection } from "@/components/BrandCollection";
import { Compass } from "lucide-react";

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("forge");

  return (
    <div className="min-h-screen bg-background">
      {/* Minimalist Header */}
      <header className="border-b border-border/30 bg-neu-base/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-soft shadow-neu-raised flex items-center justify-center">
                <Compass className="h-5 w-5 text-primary animate-float" />
              </div>
              <h1 className="text-xl font-light text-foreground">Island Forge</h1>
            </div>
            <WalletConnection 
              isConnected={isConnected}
              onConnect={() => setIsConnected(true)}
              onDisconnect={() => setIsConnected(false)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Minimalist Navigation */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-neu-base shadow-neu-inset rounded-2xl p-2 border border-border/20">
              {["forge", "gallery", "brands"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 text-sm font-medium rounded-xl transition-neu ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-neu-raised"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  }`}
                >
                  {tab === "forge" && "Island Forge"}
                  {tab === "gallery" && "My Islands"}
                  {tab === "brands" && "Brand Collections"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-16">
          {activeTab === "forge" && (
            <IslandForge 
              isConnected={isConnected}
              onGenerate={() => console.log("Generating island...")}
            />
          )}
          
          {activeTab === "gallery" && <IslandGallery />}
          
          {activeTab === "brands" && <BrandCollection isConnected={isConnected} />}
        </div>
      </main>
    </div>
  );
}
