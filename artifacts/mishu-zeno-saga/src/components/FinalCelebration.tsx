import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import confetti from 'canvas-confetti';
import { useReducedMotion } from './ReducedMotionProvider';
import Ballpit from './Ballpit';

export const FinalCelebration: React.FC = () => {
  const [charging, setCharging] = useState(false);
  const [wished, setWished] = useState(false);
  const { playSfx } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const finalImage =
    sagaConfig.gallery.find((item) => item.id === 'img3') ?? sagaConfig.gallery[2];

  const handleMakeWish = () => {
    setCharging(true);
    playSfx('energyCharge');
    
    // Simulate 5 seconds charge
    setTimeout(() => {
      setCharging(false);
      setWished(true);
      playSfx('success');
      playSfx('impact');
      
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        if (prefersReducedMotion) return;
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD43B', '#FF7A00', '#168BFF', '#E73131']
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD43B', '#FF7A00', '#168BFF', '#E73131']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
    }, 5000);
  };

  return (
    <section id="final" className="saga-section py-32 bg-space-navy relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-cosmic-purple)_0%,_var(--color-space-navy)_80%)]" />
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0 min-h-[500px] overflow-hidden opacity-[0.16] md:opacity-[0.24]">
          <Ballpit
            count={100}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            colors={[0xffd43b, 0xff7a00, 0x168bff, 0xe73131]}
            ambientIntensity={1.2}
            lightIntensity={95}
            minSize={0.05}
            maxSize={0.2}
            size0={0.32}
            maxVelocity={0.045}
            materialParams={{
              metalness: 0.35,
              roughness: 0.35,
              clearcoat: 1,
              clearcoatRoughness: 0.12
            }}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-stars opacity-80" />
      <div className="absolute inset-0 bg-space-navy/25" />
      <div className="absolute inset-0 speed-line-field opacity-10" />
      
      {/* Aura container */}
      <motion.div 
        animate={{ 
          boxShadow: wished ? '0 0 100px rgba(255,212,59,0.5) inset' : '0 0 0px rgba(255,212,59,0) inset'
        }}
        className="absolute inset-0 pointer-events-none transition-all duration-1000" 
      />

      <div className="container mx-auto px-4 saga-content text-center max-w-4xl">
        
        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.div key="pre-wish" exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }} className="relative">
              
              <div className="mb-12 relative inline-block aura-cyan rounded-2xl">
                {/* Cake visualization (abstract energy based) */}
                <div className="w-32 h-16 bg-gradient-to-t from-energy-blue to-cosmic-purple rounded-t-xl mx-auto relative border-t-2 border-electric-cyan shadow-[0_0_20px_var(--color-energy-blue)]">
                  {/* Energy flames */}
                  <div className="absolute -top-10 left-4 w-4 h-12 bg-flame-orange rounded-full blur-[2px] animate-pulse shadow-[0_0_15px_var(--color-flame-orange)]" />
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-6 h-16 bg-transformation-gold rounded-full blur-[2px] animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_20px_var(--color-transformation-gold)]" />
                  <div className="absolute -top-10 right-4 w-4 h-12 bg-flame-orange rounded-full blur-[2px] animate-pulse shadow-[0_0_15px_var(--color-flame-orange)]" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="energy-border relative mx-auto mb-10 aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-lg border border-transformation-gold/50 shadow-[0_0_40px_rgba(255,212,59,0.18)] aura-gold"
              >
                <img
                  src={finalImage.src}
                  alt={finalImage.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-navy/75 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-display text-sm uppercase tracking-widest text-transformation-gold">
                  {finalImage.caption}
                </p>
              </motion.div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-saiyan-right text-transparent bg-clip-text bg-gradient-to-br from-transformation-gold via-flame-orange to-crimson-red filter drop-shadow-[0_0_20px_rgba(255,122,0,0.8)] mb-6 uppercase leading-tight transform -skew-x-6">
                HAPPY BIRTHDAY<br />
                {sagaConfig.names.combined}
              </h2>
              
              <p className="text-lg md:text-2xl text-soft-white/90 font-medium leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md">
                May your next saga be filled with stronger transformations, unforgettable adventures, unstoppable success, and happiness beyond every universe.
              </p>
              
              {!charging ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMakeWish}
                className="anime-cta px-10 py-5 bg-transformation-gold text-space-navy font-display text-2xl uppercase tracking-widest hover:bg-white hover:text-flame-orange transition-colors shadow-[0_0_30px_rgba(255,212,59,0.5)] aura-gold"
              >
                Make the Final Wish
                </motion.button>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="font-mono text-electric-cyan uppercase tracking-widest mb-4 animate-pulse">
                    Close your eyes. Gathering ultimate energy...
                  </p>
                  <div className="w-64 h-2 bg-space-navy border border-energy-blue rounded-full overflow-hidden aura-cyan">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-white shadow-[0_0_10px_white]"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="post-wish"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="py-20 relative"
            >
              <div className="absolute inset-0 impact-flash rounded-full bg-electric-cyan/20 blur-2xl" />
              <h2 className="text-4xl md:text-6xl font-display text-electric-cyan text-glow-blue uppercase tracking-widest mb-6">
                Your Wish Has Been Sent<br />Across the Universe.
              </h2>
              <p className="text-soft-white/70 font-mono text-lg uppercase tracking-widest">
                The saga is yours to write.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
