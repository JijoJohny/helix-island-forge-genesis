import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Compass, Waves, Mountain, TreePine, Sparkles, Loader2 } from "lucide-react";

export interface IslandForgeProps {
  isConnected: boolean;
  onGenerate?: () => void;
}

const islandFeatures = [
  { icon: Waves, name: "Crystal Waters", rarity: "Common" },
  { icon: Mountain, name: "Volcanic Peak", rarity: "Rare" },
  { icon: TreePine, name: "Ancient Forest", rarity: "Epic" },
  { icon: Sparkles, name: "Mystic Aura", rarity: "Legendary" }
];

const rarityColors = {
  "Common": "bg-secondary text-secondary-foreground",
  "Rare": "bg-primary text-primary-foreground", 
  "Epic": "bg-accent text-accent-foreground",
  "Legendary": "bg-gradient-sunset text-foreground"
};

export function IslandForge({ isConnected, onGenerate }: IslandForgeProps) {
  const [isForging, setIsForging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const handleForge = async () => {
    if (!isConnected) return;
    
    setIsForging(true);
    setProgress(0);
    
    const steps = [
      "Scanning your NFT inventory...",
      "Generating unique island features...",
      "Rendering island artwork...",
      "Uploading to IPFS...",
      "Minting your Island NFT..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setIsForging(false);
    onGenerate?.();
  };

  return (
    <Card className="bg-gradient-glass border-border/40 backdrop-blur-xl shadow-floating rounded-3xl overflow-hidden">
      <CardHeader className="text-center py-8 bg-gradient-to-br from-background/20 to-transparent">
        <CardTitle className="text-3xl flex items-center justify-center gap-3 font-bold">
          <div className="p-3 rounded-2xl bg-primary/20 shadow-elevation">
            <Compass className="h-8 w-8 text-primary animate-float" />
          </div>
          Island Forge
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground font-light mt-3">
          Generate unique procedural islands based on your NFT collection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 p-8">
        {/* Island Features Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {islandFeatures.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-glass border border-border/30 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <p className="text-sm font-semibold text-center mb-2">{feature.name}</p>
              <Badge
                variant="secondary"
                className={`text-xs px-3 py-1 rounded-full ${rarityColors[feature.rarity as keyof typeof rarityColors]}`}
              >
                {feature.rarity}
              </Badge>
            </div>
          ))}
        </div>

        {/* Forge Progress */}
        {isForging && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Progress value={progress} className="w-full h-3 rounded-full" />
              <div className="flex items-center justify-center gap-3 text-base text-muted-foreground font-medium">
                <div className="p-2 rounded-full bg-primary/20">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
                {currentStep}
              </div>
            </div>
          </div>
        )}

        {/* Forge Button */}
        <div className="pt-4">
          <Button
            onClick={handleForge}
            disabled={!isConnected || isForging}
            variant="forge"
            size="lg"
            className="w-full h-16 rounded-2xl text-lg font-semibold shadow-floating hover:shadow-glow-accent transition-all duration-300"
          >
            {isForging ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Forging Island...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Forge New Island
              </>
            )}
          </Button>
        </div>
        
        {!isConnected && (
          <div className="text-center py-6 px-8 rounded-2xl bg-muted/20 border border-border/20">
            <p className="text-base text-muted-foreground font-medium">
              Connect your wallet to start forging islands
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}