"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Sparkles, Palette, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function HelloCanvasContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [greeting, setGreeting] = useState("Hello, World!");
  const [textColor, setTextColor] = useState("#26D99C");
  const [canvasBgColor, setCanvasBgColor] = useState("#FFFFFF");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const g = searchParams.get('g');
    const t = searchParams.get('t');
    const b = searchParams.get('b');
    if (g) setGreeting(decodeURIComponent(g));
    if (t) setTextColor(decodeURIComponent(t));
    if (b) setCanvasBgColor(decodeURIComponent(b));
  }, [searchParams]);

  const handleCopyLink = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set('g', encodeURIComponent(greeting));
    url.searchParams.set('t', encodeURIComponent(textColor));
    url.searchParams.set('b', encodeURIComponent(canvasBgColor));
    
    navigator.clipboard.writeText(url.toString());
    toast({
      title: "Link copied!",
      description: "Share this unique greeting with anyone.",
    });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        {/* Header Branding */}
        <header className="text-center space-y-2 mb-4 animate-in fade-in duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" />
            Hello Canvas
          </h1>
          <p className="text-muted-foreground font-medium">Create and share your perfect hello.</p>
        </header>

        {/* Dynamic Greeting Display */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] border-8 border-white group">
          <div 
            className="w-full h-full flex items-center justify-center p-8 transition-colors duration-500"
            style={{ backgroundColor: canvasBgColor }}
          >
            <h2 
              className="text-5xl sm:text-7xl md:text-8xl font-black text-center break-words greeting-animation transition-colors duration-500"
              style={{ color: textColor }}
            >
              {greeting || "..."}
            </h2>
          </div>
          
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={handleCopyLink}
            >
              <Share2 className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        {/* Customizer Controls */}
        <Card className="w-full max-w-2xl bg-white/50 backdrop-blur-md border-white/20 p-8 shadow-xl rounded-[2rem] animate-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                <Type className="w-4 h-4" />
                <Label htmlFor="greeting-input">Custom Message</Label>
              </div>
              <Input
                id="greeting-input"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Type your greeting..."
                className="bg-white border-primary/20 focus:border-primary rounded-xl h-12 text-lg"
                maxLength={50}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                <Palette className="w-4 h-4" />
                <Label>Colors</Label>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Text</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded-full border-none cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono">{textColor}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Canvas</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={canvasBgColor}
                      onChange={(e) => setCanvasBgColor(e.target.value)}
                      className="w-10 h-10 rounded-full border-none cursor-pointer bg-transparent shadow-inner"
                    />
                    <span className="text-xs font-mono">{canvasBgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 h-14 rounded-2xl text-lg font-bold bg-accent hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-95"
              onClick={handleCopyLink}
            >
              <Copy className="mr-2 w-5 h-5" />
              Copy Share Link
            </Button>
            
            <Button 
              variant="outline" 
              className="h-14 rounded-2xl px-8 border-primary/20 text-primary hover:bg-primary/5 font-semibold"
              onClick={() => {
                setGreeting("Hi there!");
                setTextColor("#26D99C");
                setCanvasBgColor("#FFFFFF");
              }}
            >
              Reset
            </Button>
          </div>
        </Card>

        {/* Footer info */}
        <footer className="text-xs text-muted-foreground opacity-50 font-medium">
          Built with Love & Serenity
        </footer>
      </div>
      <Toaster />
    </main>
  );
}

export default function HelloCanvas() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><p className="text-primary font-medium animate-pulse">Loading Canvas...</p></div>}>
      <HelloCanvasContent />
    </Suspense>
  );
}
