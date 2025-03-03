
import React from 'react';
import HexagonGenerator from '@/components/HexagonGenerator';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full animate-slide-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Random ID Generator</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create random hexadecimal strings that can be used as Participant IDs.
          </p>
        </div>
        
        <HexagonGenerator />
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p></p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
