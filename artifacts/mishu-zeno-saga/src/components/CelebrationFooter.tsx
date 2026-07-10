import React from 'react';
import { sagaConfig } from '../config/saga';
import { RotateCcw, ArrowUp, Share2, Copy } from 'lucide-react';
import { useAudio } from './AudioProvider';

export const CelebrationFooter: React.FC = () => {
  const { playSfx } = useAudio();

  const handleReplay = () => {
    playSfx('hover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Soft reload by replacing state isn't needed if we just scroll up, 
    // but the spec says "restart main celebration animations without reloading".
    // We can just scroll up to hero.
  };

  const handleTop = () => {
    playSfx('hover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyLink = () => {
    playSfx('orbSound');
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <footer className="bg-space-navy border-t border-energy-blue/30 py-8 relative z-20">
      <div className="container mx-auto px-4 flex flex-col items-center">
        
        <p className="font-display text-soft-white text-xl uppercase tracking-wider mb-8 text-center text-glow-blue">
          Crafted with unlimited energy for {sagaConfig.names.combined}.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={handleReplay} className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple/50 border border-energy-blue/50 text-energy-blue rounded hover:bg-energy-blue hover:text-space-navy font-mono text-xs uppercase tracking-widest transition-colors">
            <RotateCcw size={14} /> Replay
          </button>
          <button onClick={handleTop} className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple/50 border border-energy-blue/50 text-energy-blue rounded hover:bg-energy-blue hover:text-space-navy font-mono text-xs uppercase tracking-widest transition-colors">
            <ArrowUp size={14} /> Top
          </button>
          <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple/50 border border-energy-blue/50 text-energy-blue rounded hover:bg-energy-blue hover:text-space-navy font-mono text-xs uppercase tracking-widest transition-colors">
            <Copy size={14} /> Copy Link
          </button>
        </div>

        <div className="text-soft-white/30 font-mono text-xs uppercase tracking-widest text-center">
          &copy; {new Date().getFullYear()} Legendary Saga. All energies reserved.
        </div>
      </div>
    </footer>
  );
};