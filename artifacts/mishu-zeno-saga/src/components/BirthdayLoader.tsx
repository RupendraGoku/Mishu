import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './AudioProvider';
import { sagaConfig } from '../config/saga';

export const BirthdayLoader: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [powerLevel, setPowerLevel] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { playSfx } = useAudio();
  const [orbs, setOrbs] = useState<number[]>([]);
  const progress = Math.min(100, (powerLevel / 9000) * 100);
  const cloudPosition = Math.min(98, Math.max(2, progress));
  const cloudAsset = `${import.meta.env.BASE_URL}floter/cloud5.png`;

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel(prev => {
        if (prev >= 9000) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500);
          return 9001; // IT'S OVER 9000
        }
        return prev + Math.floor(Math.random() * 500) + 100;
      });
    }, 100);

    // Orb animation sequence
    const orbSequence = async () => {
      for(let i=0; i<7; i++) {
        await new Promise(r => setTimeout(r, 200));
        setOrbs(prev => [...prev, i]);
      }
    };
    orbSequence();

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    // Sound will be triggered inside the parent/audio context but let's play the impact directly here if we had access, but since audio only starts on click:
    onStart();
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-space-navy flex flex-col items-center justify-center overflow-hidden bg-stars"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/30 to-space-navy/90 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
        {!isLoaded ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-display text-electric-cyan text-glow-blue mb-8 uppercase tracking-widest">
              Gathering Birthday Energy...
            </h2>
            
            <div className="relative w-64 h-64 mb-8">
              {orbs.map((_, i) => {
                const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
                const radius = 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full bg-flame-orange box-glow-gold flex items-center justify-center"
                    style={{ x, y }}
                  >
                    <div className="w-4 h-4 rounded-full bg-transformation-gold" />
                  </motion.div>
                );
              })}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-display text-transformation-gold text-glow font-bold">
                  {powerLevel > 9000 ? "OVER 9000!" : powerLevel}
                </span>
              </div>
            </div>
            
            <div className="relative w-full pt-7">
              <motion.img
                src={cloudAsset}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none absolute top-0 z-20 h-9 w-14 -translate-x-1/2 object-contain drop-shadow-[0_0_14px_rgba(73,232,255,0.75)]"
                animate={{ left: `${cloudPosition}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <div className="h-4 w-full overflow-hidden rounded-full border border-energy-blue/30 bg-gray-900 relative">
                <motion.div 
                  className="h-full bg-energy-blue box-glow"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-display text-transformation-gold text-glow mb-12 uppercase leading-tight">
              A Legendary Birthday Saga<br />Is About to Begin
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="relative px-8 py-4 bg-energy-blue text-space-navy font-display text-2xl uppercase tracking-widest clip-button hover:bg-electric-cyan transition-colors"
            >
              <div className="absolute inset-0 bg-white/20 hover:opacity-0 transition-opacity" />
              Enter the Celebration
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Speed lines effect when loading finishes */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, var(--color-electric-cyan) 10deg 20deg)',
              animation: 'spin 20s linear infinite',
              maskImage: 'radial-gradient(circle, transparent 20%, black 100%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 20%, black 100%)'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
