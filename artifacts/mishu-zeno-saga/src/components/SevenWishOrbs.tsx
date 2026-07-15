import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import Hyperspeed from './Hyperspeed';
import { useReducedMotion } from './ReducedMotionProvider';

export const SevenWishOrbs: React.FC = () => {
  const [collected, setCollected] = useState<number[]>([]);
  const [showFinal, setShowFinal] = useState(false);
  const { playSfx } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const dragonAsset = `${import.meta.env.BASE_URL}image/dragon.png`;
  const hyperspeedOptions = useMemo(
    () => ({
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 4,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: [60, 80] as [number, number],
      movingCloserSpeed: [-120, -160] as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      colors: {
        roadColor: 0x050816,
        islandColor: 0x080808,
        background: 0x000000,
        shoulderLines: 0x168bff,
        brokenLines: 0xffd43b,
        leftCars: [0xff7a00, 0xffd43b, 0xe73131],
        rightCars: [0x49e8ff, 0x168bff, 0x261447],
        sticks: 0x49e8ff,
      },
    }),
    []
  );

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
    <section id="birthday-orbs" className="saga-section py-20 md:py-24 bg-space-navy relative overflow-hidden transition-colors duration-1000" style={{
      backgroundColor: showFinal ? '#000000' : 'var(--color-space-navy)'
    }}>
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0 opacity-35 md:opacity-50">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
      )}
      <div className="absolute inset-0 z-0 bg-space-navy/45" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,8,22,0.52)_70%,_var(--color-space-navy)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-space-navy to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-space-navy to-transparent" />
      <div className="container mx-auto px-4 saga-content text-center">
        
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key="collect"
              exit={{ opacity: 0, y: -50 }}
            >
              <h2 className="text-3xl md:text-5xl font-display text-transformation-gold uppercase tracking-widest mb-3 text-glow">
                Collect All Seven Birthday Wishes
              </h2>
              <p className="power-level-text text-[10px] md:text-xs mb-4">
                {collected.length}/7 Orbs Gathered
              </p>
              <div className="mx-auto mb-8 h-2 max-w-md overflow-hidden rounded-full border border-transformation-gold/30 bg-space-navy aura-gold">
                <motion.div
                  className="h-full bg-gradient-to-r from-flame-orange via-transformation-gold to-electric-cyan"
                  animate={{ width: `${(collected.length / 7) * 100}%` }}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-5 md:gap-8 max-w-4xl mx-auto min-h-[260px]">
                {sagaConfig.sevenWishes.map((wish, i) => {
                  const isCollected = collected.includes(i);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.75, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
                    >
                      <button
                        onClick={() => handleOrbClick(i)}
                        disabled={isCollected}
                        className={`dragon-orb absolute inset-0 transition-all duration-500 flex items-center justify-center
                          ${isCollected 
                            ? 'opacity-35 scale-90 grayscale-[0.25]' 
                            : 'hover:scale-110 hover:shadow-[0_0_38px_var(--color-transformation-gold)]'
                          }`}
                      >
                        {!isCollected && (
                          <div className="w-1/2 h-1/2 rounded-full bg-white/20 filter blur-[2px]" />
                        )}
                        {/* Stars based on index + 1 */}
                        {!isCollected && (
                          <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-1 p-4 opacity-50">
                             {Array.from({length: i+1}).map((_, starIdx) => (
                               <div key={starIdx} className="w-2 h-2 text-crimson-red drop-shadow-[0_0_4px_rgba(231,49,49,0.75)]">★</div>
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
                              Wish {i + 1}: {wish}
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
              <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-cyan/40 aura-cyan" />
              <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-transformation-gold/40 aura-gold" />
              {/* Lightning effects */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwb2x5Z29uIHBvaW50cz0iNTAsMCA0MCw0MCA2MCw0MCAzMCwxMDAgNDUsNTAgMjUsNTAgNzAsMCIgZmlsbD0iIzQ5RThGRiIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] bg-no-repeat bg-center mix-blend-screen animate-pulse" />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
              >
                <motion.img
                  src={dragonAsset}
                  alt="Summoned birthday dragon"
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.25, duration: 1, ease: 'easeOut' }}
                  className="relative z-10 mx-auto mb-6 max-h-[260px] w-[min(82vw,520px)] object-contain drop-shadow-[0_0_36px_rgba(73,232,255,0.65)]"
                  decoding="async"
                  loading="lazy"
                />
                <div className="scouter-panel energy-border inline-block p-8 rounded-3xl relative overflow-hidden">
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
