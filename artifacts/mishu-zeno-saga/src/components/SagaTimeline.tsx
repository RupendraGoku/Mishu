import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { Swords } from 'lucide-react';
import { useReducedMotion } from './ReducedMotionProvider';

export const SagaTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const timelineBg = `${import.meta.env.BASE_URL}image/bg.jpg`;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", prefersReducedMotion ? "100%" : "100%"]);

  return (
    <section id="saga" ref={containerRef} className="saga-section py-24 relative bg-space-navy overflow-hidden">
      <img
        src={timelineBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-space-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy/45 via-space-navy/10 to-space-navy/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,8,22,0.62)_92%)]" />
      <div className="absolute inset-0 manga-halftone opacity-20" />
      <div className="container mx-auto px-4 saga-content">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display text-transformation-gold text-glow uppercase tracking-widest">
            The Mishu × Zeno Saga
          </h2>
          <p className="mt-4 power-level-text text-[10px] md:text-xs">Chronicles of a Legendary Bond / Training Arc Data</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center Energy Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-cosmic-purple/50 md:-translate-x-1/2 overflow-hidden rounded-full">
            <motion.div 
              className="w-full bg-gradient-to-b from-energy-blue via-electric-cyan to-transformation-gold shadow-[0_0_10px_var(--color-electric-cyan)]"
              style={{ height: prefersReducedMotion ? "100%" : lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {sagaConfig.timeline.map((chapter, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={chapter.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Node Icon */}
                  <div className="absolute left-[-2px] md:left-1/2 top-0 md:top-1/2 w-12 h-12 -translate-x-0 md:-translate-x-1/2 md:-translate-y-1/2 bg-space-navy border-2 border-energy-blue rounded-full flex items-center justify-center z-10 aura-cyan">
                    <Swords size={20} className="text-electric-cyan" />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-transformation-gold shadow-[0_0_10px_var(--color-transformation-gold)]" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="scouter-panel energy-border p-6 rounded-lg hover:border-electric-cyan/60 transition-all group relative overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-energy-blue/20 clip-slant group-hover:bg-electric-cyan/40 transition-colors" />
                      
                      <div className="text-xs font-mono text-energy-blue mb-2 uppercase tracking-widest flex items-center gap-2 justify-start md:justify-end">
                        <span className={isEven ? '' : 'md:hidden'}>{chapter.date}</span>
                        <span className="hidden md:inline">{isEven ? chapter.date : `Chapter ${chapter.chapterNumber}`}</span>
                        {isEven && <span className="hidden md:inline px-2">|</span>}
                        <span className="hidden md:inline">{isEven ? `Chapter ${chapter.chapterNumber}` : chapter.date}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display text-soft-white uppercase tracking-wider mb-3 group-hover:text-transformation-gold transition-colors">
                        {chapter.title}
                      </h3>
                      
                      <p className="text-soft-white/70 text-sm md:text-base leading-relaxed mb-4">
                        {chapter.story}
                      </p>

                      <div className="inline-flex items-center gap-2 bg-space-navy/80 px-3 py-1 rounded border border-flame-orange/40 text-xs font-mono">
                        <span className="text-flame-orange">Power +{chapter.powerIncrease}</span>
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-cosmic-purple">
                          <span className="block h-full bg-gradient-to-r from-flame-orange to-transformation-gold" style={{ width: `${Math.min(100, chapter.powerIncrease / 100)}%` }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
