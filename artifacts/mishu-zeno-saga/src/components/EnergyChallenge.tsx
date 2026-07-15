import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './AudioProvider';
import confetti from 'canvas-confetti';
import { useReducedMotion } from './ReducedMotionProvider';
import MagicRings from './MagicRings';

export const EnergyChallenge: React.FC = () => {
  const [power, setPower] = useState(0);
  const [released, setReleased] = useState(false);
  const [pulseId, setPulseId] = useState(0);
  const { playSfx } = useAudio();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (released) return;
    setPower(p => {
      const next = Math.min(100, p + 5);
      if (next % 25 === 0 && next !== 100) playSfx('orbSound');
      if (next === 100 && p !== 100) playSfx('powerUp');
      return next;
    });
    playSfx('hover');
    
    if (!prefersReducedMotion) {
      setPulseId(Date.now());
      // Add subtle screen shake via CSS class on body temporarily
      document.body.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
      setTimeout(() => { document.body.style.transform = 'none'; }, 50);
    }
  };

  const handleRelease = () => {
    setReleased(true);
    playSfx('impact');
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD43B', '#168BFF', '#FF7A00']
      });
    }
  };

  const getStageText = () => {
    if (power === 0) return "Energy Detected";
    if (power < 50) return "Power Rising";
    if (power < 75) return "Transformation Started";
    if (power < 100) return "Legendary Aura";
    return "Birthday Blast Ready";
  };

  return (
    <section className="saga-section py-24 bg-space-navy relative flex items-center justify-center overflow-hidden border-y border-energy-blue/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-cosmic-purple)_0%,_var(--color-space-navy)_70%)] opacity-50" />
      <div className="absolute inset-0 scouter-grid opacity-15" />
      {!prefersReducedMotion && (
        <div className="absolute left-1/2 top-[54%] z-[1] h-[440px] w-screen -translate-x-1/2 -translate-y-1/2 opacity-75 md:h-[620px]">
          <MagicRings
            color="#49E8FF"
            colorTwo="#FFD43B"
            speed={1.1 + power / 140}
            ringCount={7}
            attenuation={9.2}
            lineThickness={5.2}
            baseRadius={0.14}
            radiusStep={0.074}
            scaleRate={0.28 + power / 320}
            opacity={0.78}
            noiseAmount={0}
            rotation={-18}
            ringGap={1.18}
            fadeIn={0.25}
            fadeOut={1.05}
            followMouse
            mouseInfluence={0.08}
            hoverScale={1.08}
            parallax={0.025}
            blur={released ? 0.4 : 0}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 saga-content text-center">
        <h2 className="text-3xl md:text-5xl font-display text-electric-cyan text-glow-blue uppercase tracking-widest mb-4">
          Charge the Birthday Blast
        </h2>
        <p className="power-level-text text-[10px] md:text-xs mb-12">
          Tap the core to gather energy
        </p>

        {!released ? (
          <div className="flex flex-col items-center">
            {/* The Orb */}
            <motion.button
              onClick={handleClick}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: 1 + (power / 100) * 0.5,
                filter: `drop-shadow(0 0 ${20 + power}px var(--color-electric-cyan))`
              }}
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-electric-cyan to-energy-blue flex items-center justify-center overflow-hidden mb-12 aura-cyan"
            >
              <AnimatePresence>
                {pulseId > 0 && (
                  <motion.div
                    key={pulseId}
                    initial={{ scale: 0.8, opacity: 0.85 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border-2 border-transformation-gold"
                  />
                )}
              </AnimatePresence>
              {[0, 1, 2, 3].map((spark) => (
                <span
                  key={spark}
                  className="ki-spark"
                  style={{
                    left: `${18 + spark * 19}%`,
                    top: `${10 + (spark % 2) * 70}%`,
                    animationDelay: `${spark * 0.35}s`,
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-space-navy/50 to-transparent mix-blend-overlay" />
              <span className="relative font-display text-3xl md:text-5xl text-white drop-shadow-md">
                {power}%
              </span>
            </motion.button>

            <div className="h-2 w-full max-w-md bg-space-navy rounded-full border border-energy-blue/30 overflow-hidden mb-4 aura-cyan">
              <motion.div 
                className="h-full bg-electric-cyan shadow-[0_0_10px_var(--color-electric-cyan)]"
                animate={{ width: `${power}%` }}
              />
            </div>
            
            <p className="font-mono text-soft-white uppercase tracking-wider mb-8 h-6">
              {getStageText()}
            </p>

            <AnimatePresence>
              {power === 100 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleRelease}
                  className="anime-cta px-8 py-4 bg-flame-orange text-white font-display text-2xl uppercase tracking-widest hover:bg-transformation-gold hover:text-space-navy transition-colors animate-pulse aura-gold"
                >
                  Release Birthday Energy
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="py-12 relative"
          >
            <div className="absolute inset-0 impact-flash rounded-full bg-transformation-gold/20 blur-xl" />
            <h3 className="text-3xl md:text-5xl font-display text-transformation-gold uppercase tracking-widest mb-4 leading-tight text-glow">
              Happy Birthday, Mishu × Zeno!
            </h3>
            <p className="text-xl md:text-2xl text-soft-white/90 font-medium">
              May Your Saga Become More Legendary Every Year.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
