import React from 'react';
import { motion } from 'framer-motion';

interface EpisodeTransitionProps {
  number: string;
  title: string;
}

export const EpisodeTransition: React.FC<EpisodeTransitionProps> = ({ number, title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-12 bg-space-navy flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--color-electric-cyan)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 manga-halftone opacity-25" />
      
      {/* Speed lines background */}
      <div className="absolute inset-0 pointer-events-none speed-line-field opacity-25" />

      <div className="scouter-panel energy-border relative z-10 text-center px-4 py-7 w-full max-w-5xl shadow-[0_0_30px_rgba(22,139,255,0.1)]">
        <motion.div
          initial={{ x: '-120%', opacity: 0 }}
          whileInView={{ x: '120%', opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-transformation-gold/25 to-transparent"
        />
        <motion.p 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="power-level-text text-[10px] md:text-xs mb-2"
        >
          Episode {number} / Transmission Card
        </motion.p>
        
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
          className="text-3xl md:text-5xl font-display text-soft-white uppercase tracking-widest drop-shadow-[2px_2px_0_var(--color-cosmic-purple)]"
        >
          {title}
        </motion.h2>
      </div>
    </motion.div>
  );
};
