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
    <Card className="bg-neu-base border border-border/20 shadow-neu-floating rounded-3xl overflow-hidden max-w-4xl mx-auto">
      <CardHeader className="text-center py-12 bg-gradient-subtle">
        <CardTitle className="text-4xl flex items-center justify-center gap-4 font-light text-foreground">
          <div className="p-4 rounded-2xl bg-primary-soft shadow-neu-raised">
            <Compass className="h-10 w-10 text-primary animate-float" />
          </div>
          Island Forge
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground font-light mt-4 max-w-2xl mx-auto">
          Generate unique procedural islands based on your NFT collection using advanced algorithms
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-12 p-12">
        {/* Island Features Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {islandFeatures.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-8 rounded-3xl bg-neu-base border border-border/10 shadow-neu-raised hover:shadow-neu-floating transition-neu"
            >
              <div className="p-6 rounded-2xl bg-primary-soft/30 group-hover:bg-primary-soft/50 transition-neu mb-6 shadow-neu-soft">
                <feature.icon className="h-12 w-12 text-primary" />
              </div>
              <p className="text-sm font-medium text-center mb-3 text-foreground">{feature.name}</p>
              <Badge
                variant="secondary"
                className={`text-xs px-4 py-1.5 rounded-full shadow-neu-soft ${rarityColors[feature.rarity as keyof typeof rarityColors]}`}
              >
                {feature.rarity}
              </Badge>
            </div>
          ))}
        </div>

        {/* Forge Progress */}
        {isForging && (
          <div className="space-y-8 bg-gradient-subtle rounded-2xl p-8 border border-border/10 shadow-neu-inset">
            <div className="space-y-4">
              <Progress value={progress} className="w-full h-4 rounded-full" />
              <div className="flex items-center justify-center gap-4 text-base text-muted-foreground font-medium">
                <div className="p-3 rounded-full bg-primary-soft shadow-neu-raised">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
                {currentStep}
              </div>
            </div>
          </div>
        )}

        {/* Forge Button */}
        <div className="pt-6">
          <Button
            onClick={handleForge}
            disabled={!isConnected || isForging}
            variant="primary"
            size="lg"
            className="w-full h-16 rounded-2xl text-lg font-medium shadow-neu-floating hover:shadow-glow-mystic transition-neu"
          >
            {isForging ? (
              <>
                <Loader2 className="mr-4 h-6 w-6 animate-spin" />
                Forging Island...
              </>
            ) : (
              <>
                <Sparkles className="mr-4 h-6 w-6" />
                Forge New Island
              </>
            )}
          </Button>
        </div>
        
        {!isConnected && (
          <div className="text-center py-8 px-10 rounded-2xl bg-muted/10 border border-border/10 shadow-neu-inset">
            <p className="text-base text-muted-foreground font-light">
              Connect your wallet to start forging islands
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}