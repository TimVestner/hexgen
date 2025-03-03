
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CollisionCalculatorProps {
  idLength: number;
  className?: string;
}

const CollisionCalculator = ({ idLength, className }: CollisionCalculatorProps) => {
  const [participants, setParticipants] = useState(100);
  const [collisionProbability, setCollisionProbability] = useState<number | null>(null);

  const calculateCollisionProbability = () => {
    // Calculate the total possible values (16^length since hex has 16 possible values per position)
    const possibleValues = Math.pow(16, idLength);
    
    // Using the birthday paradox formula: 1 - e^(-n(n-1)/(2m))
    // Where n is the number of participants and m is the number of possible values
    const exponent = -participants * (participants - 1) / (2 * possibleValues);
    
    // Prevent overflow for very large numbers
    if (exponent < -700) {
      // For extremely negative exponents, the probability is effectively 0
      setCollisionProbability(0);
    } else {
      const probability = 1 - Math.exp(exponent);
      setCollisionProbability(probability);
    }
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setParticipants(value);
    }
  };

  const formatProbability = (probability: number): string => {
    if (probability < 0.0001) {
      return probability.toExponential(4);
    }
    
    // Format as percentage with up to 4 decimal places
    return `${(probability * 100).toFixed(4)}%`;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Collision Probability Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Calculate the probability of a collision when assigning random IDs to participants.
          </p>
        </div>
        
        <div className="relative w-full">
          <label 
            htmlFor="participants-count" 
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Number of Participants
          </label>
          <div className="relative input-focus-effect rounded-md">
            <input
              id="participants-count"
              type="number"
              min={2}
              value={participants}
              onChange={handleParticipantsChange}
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-md focus:outline-none transition-all duration-200"
            />
          </div>
        </div>
        
        <button
          onClick={calculateCollisionProbability}
          className={cn(
            "w-full py-3 px-4 rounded-md bg-primary text-primary-foreground font-medium",
            "transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          )}
        >
          Calculate Probability
        </button>
        
        {collisionProbability !== null && (
          <div className="mt-4 p-4 bg-secondary/50 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Result:</span> With {participants} participants and an ID length of {idLength} characters, 
              the probability of at least one collision is:
            </p>
            <p className="text-xl font-semibold mt-2 text-center">
              {formatProbability(collisionProbability)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on the birthday paradox probability calculation: 1 - e^(-n(n-1)/(2m))
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollisionCalculator;
