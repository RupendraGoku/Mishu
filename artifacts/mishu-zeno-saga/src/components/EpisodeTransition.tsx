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
      className="w-full py-16 bg-space-navy flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--color-electric-cyan)_0%,_transparent_70%)]" />
      
      {/* Speed lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, var(--color-energy-blue) 40px, var(--color-energy-blue) 42px)'
      }} />

      <div className="relative z-10 text-center px-4 border-y-2 border-energy-blue/50 py-8 bg-space-navy/80 backdrop-blur-md w-full max-w-5xl shadow-[0_0_30px_rgba(22,139,255,0.1)]">
        <motion.p 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-energy-blue font-mono uppercase tracking-[0.3em] text-sm md:text-base mb-2"
        >
          Episode {number}
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