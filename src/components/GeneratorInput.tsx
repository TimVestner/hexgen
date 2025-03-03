
import React from 'react';
import { cn } from '@/lib/utils';

interface GeneratorInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const GeneratorInput = ({
  value,
  onChange,
  min = 1,
  max = 64,
  className
}: GeneratorInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <label 
        htmlFor="hex-length" 
        className="block text-sm font-medium text-muted-foreground mb-2"
      >
        Length
      </label>
      <div className="relative input-focus-effect rounded-md">
        <input
          id="hex-length"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-md focus:outline-none transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-sm text-muted-foreground">characters</span>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>
    </div>
  );
};

export default GeneratorInput;
