import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';

export const SevenWishOrbs: React.FC = () => {
  const [collected, setCollected] = useState<number[]>([]);
  const [showFinal, setShowFinal] = useState(false);
  const { playSfx } = useAudio();

  const handleOrbClick = (index: number) => {
    if (collected.includes(index)) return;
    playSfx('orbSound');
    
    const newCollected = [...collected, index];
    setCollected(newCollected);
    
    if (newCollected.length === 7) {
      setTimeout(() => {
        playSfx('powerUp');
        setShowFinal(true);
      }, 1000);
    }
  };

  return (
    <section className="py-32 bg-space-navy relative overflow-hidden transition-colors duration-1000" style={{
      backgroundColor: showFinal ? '#000000' : 'var(--color-space-navy)'
    }}>
      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key="collect"
              exit={{ opacity: 0, y: -50 }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-transformation-gold uppercase tracking-widest mb-4 text-glow">
                Collect All Seven Birthday Wishes
              </h2>
              <p className="text-soft-white/70 font-mono text-sm uppercase tracking-widest mb-16">
                {collected.length}/7 Orbs Gathered
              </p>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl mx-auto min-h-[300px]">
                {sagaConfig.sevenWishes.map((wish, i) => {
                  const isCollected = collected.includes(i);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
                    >
                      <button
                        onClick={() => handleOrbClick(i)}
                        disabled={isCollected}
                        className={`absolute inset-0 rounded-full transition-all duration-500 flex items-center justify-center
                          ${isCollected 
                            ? 'bg-transparent border border-transformation-gold/20' 
                            : 'bg-gradient-to-br from-flame-orange to-transformation-gold shadow-[0_0_20px_var(--color-flame-orange)] hover:scale-110 hover:shadow-[0_0_30px_var(--color-transformation-gold)]'
                          }`}
                      >
                        {!isCollected && (
                          <div className="w-1/2 h-1/2 rounded-full bg-white/20 filter blur-[2px]" />
                        )}
                        {/* Stars based on index + 1 */}
                        {!isCollected && (
                          <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-1 p-4 opacity-50">
                             {Array.from({length: i+1}).map((_, starIdx) => (
                               <div key={starIdx} className="w-2 h-2 text-red-700">★</div>
                             ))}
                          </div>
                        )}
                      </button>

                      <AnimatePresence>
                        {isCollected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute inset-x-[-50%] top-full mt-4 text-center z-20"
                          >
                            <span className="bg-space-navy/90 border border-transformation-gold/50 px-3 py-1 rounded-full text-xs font-mono text-transformation-gold uppercase whitespace-nowrap shadow-[0_0_10px_rgba(255,212,59,0.3)]">
                              {wish}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="summoned"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="py-20 relative"
            >
              {/* Lightning effects */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwb2x5Z29uIHBvaW50cz0iNTAsMCA0MCw0MCA2MCw0MCAzMCwxMDAgNDUsNTAgMjUsNTAgNzAsMCIgZmlsbD0iIzQ5RThGRiIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] bg-no-repeat bg-center mix-blend-screen animate-pulse" />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
              >
                <div className="inline-block border-2 border-electric-cyan p-8 rounded-3xl bg-space-navy/50 backdrop-blur-md shadow-[0_0_50px_var(--color-electric-cyan)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-electric-cyan/20 to-transparent" />
                  <h3 className="relative z-10 text-xl md:text-2xl font-mono text-electric-cyan uppercase tracking-[0.2em] mb-6">
                    The Celestial Energy Granted:
                  </h3>
                  <p className="relative z-10 text-3xl md:text-5xl font-display text-soft-white uppercase tracking-wider leading-tight text-glow-blue">
                    "{sagaConfig.finalWish}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};