
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { generateHexString } from '@/utils/hexUtils';
import GeneratorInput from './GeneratorInput';
import GeneratedString from './GeneratedString';
import { useToast } from '@/components/ui/use-toast';

interface HexagonGeneratorProps {
  className?: string;
}

const HexagonGenerator = ({ className }: HexagonGeneratorProps) => {
  const { toast } = useToast();
  const [length, setLength] = useState(16);
  const [hexString, setHexString] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateString = () => {
    setIsGenerating(true);
    
    // Small delay for visual feedback
    setTimeout(() => {
      try {
        const newHexString = generateHexString(length);
        setHexString(newHexString);
      } catch (error) {
        console.error('Error generating hex string:', error);
        toast({
          title: "Generation failed",
          description: "Failed to generate hex string. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 150);
  };

  // Generate a string when the component first mounts
  useEffect(() => {
    generateString();
  }, []);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="hex-container glass rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium tracking-tight">Hexagon Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate random hexadecimal strings of customizable length.
            </p>
          </div>
          
          <div className="space-y-4">
            <GeneratorInput 
              value={length} 
              onChange={setLength}
              min={1}
              max={64}
            />
            
            <button
              onClick={generateString}
              disabled={isGenerating}
              className={cn(
                "w-full py-3 px-4 rounded-md bg-primary text-primary-foreground font-medium",
                "transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                isGenerating ? "opacity-90" : "opacity-100",
                "disabled:opacity-50"
              )}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            
            <GeneratedString value={hexString} />
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>Each string is randomly generated and never stored.</p>
      </div>
    </div>
  );
};

export default HexagonGenerator;
