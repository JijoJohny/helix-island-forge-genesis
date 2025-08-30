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
    <Card className="bg-gradient-deep border-border/30 backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Compass className="h-6 w-6 text-primary animate-float" />
          Island Forge
        </CardTitle>
        <CardDescription>
          Generate unique procedural islands based on your NFT collection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Island Features Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {islandFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg bg-card/30 border border-border/20 backdrop-blur-sm"
            >
              <feature.icon className="h-8 w-8 text-primary mb-2" />
              <p className="text-xs font-medium text-center mb-1">{feature.name}</p>
              <Badge
                variant="secondary"
                className={`text-xs ${rarityColors[feature.rarity as keyof typeof rarityColors]}`}
              >
                {feature.rarity}
              </Badge>
            </div>
          ))}
        </div>

        {/* Forge Progress */}
        {isForging && (
          <div className="space-y-3">
            <Progress value={progress} className="w-full" />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {currentStep}
            </div>
          </div>
        )}

        {/* Forge Button */}
        <Button
          onClick={handleForge}
          disabled={!isConnected || isForging}
          variant="forge"
          size="lg"
          className="w-full"
        >
          {isForging ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Forging Island...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Forge New Island
            </>
          )}
        </Button>
        
        {!isConnected && (
          <p className="text-center text-sm text-muted-foreground">
            Connect your wallet to start forging islands
          </p>
        )}
      </CardContent>
    </Card>
  );
}