
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/hexUtils';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GeneratedStringProps {
  value: string;
  className?: string;
}

const GeneratedString = ({ value, className }: GeneratedStringProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(value);
    
    if (success) {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The hexadecimal string has been copied to your clipboard.",
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div 
      className={cn(
        "relative w-full bg-background border border-border rounded-md p-4 overflow-hidden animate-fade-in",
        className
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-muted-foreground">Generated Hex String</span>
        <button
          onClick={handleCopy}
          className="copy-btn rounded-full p-1.5 text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <div 
        className="font-mono text-sm sm:text-base break-all p-3 bg-secondary/50 rounded border border-border"
      >
        {value || "Press 'Generate' to create a hex string"}
      </div>
    </div>
  );
};

export default GeneratedString;
