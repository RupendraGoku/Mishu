import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudio } from './AudioProvider';
import TiltedCard from './TiltedCard';

export const MemoryUniverse: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const { playSfx } = useAudio();
  const selectedItem = selectedImg !== null ? sagaConfig.gallery[selectedImg] : null;

  const handleOpen = (index: number) => {
    playSfx('hover');
    setSelectedImg(index);
  };

  const handleClose = () => {
    playSfx('hover');
    setSelectedImg(null);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSfx('hover');
    if (selectedImg !== null) {
      setSelectedImg((selectedImg + 1) % sagaConfig.gallery.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSfx('hover');
    if (selectedImg !== null) {
      setSelectedImg((selectedImg - 1 + sagaConfig.gallery.length) % sagaConfig.gallery.length);
    }
  };

  const getAccent = (color: string) => {
    switch (color) {
      case 'blue': return { accent: 'rgba(22,139,255,0.9)', glow: 'rgba(22,139,255,0.45)' };
      case 'gold': return { accent: 'rgba(255,212,59,0.95)', glow: 'rgba(255,212,59,0.45)' };
      case 'purple': return { accent: 'rgba(144,92,255,0.85)', glow: 'rgba(100,50,150,0.55)' };
      case 'orange': return { accent: 'rgba(255,122,0,0.95)', glow: 'rgba(255,122,0,0.45)' };
      case 'cyan': return { accent: 'rgba(73,232,255,0.95)', glow: 'rgba(73,232,255,0.45)' };
      default: return { accent: 'rgba(248,250,255,0.8)', glow: 'rgba(248,250,255,0.25)' };
    }
  };

  return (
    <section id="memories" className="saga-section py-24 bg-space-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-50" />
      <div className="absolute inset-0 manga-halftone opacity-25" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-space-navy to-transparent" />
      
      <div className="container mx-auto px-4 saga-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-electric-cyan text-glow-blue uppercase tracking-widest">
            Memory Universe
          </h2>
          <p className="mt-4 power-level-text text-[10px] md:text-xs">Archive scan / eight memory portals found</p>
          <p className="mt-4 text-soft-white/70 max-w-2xl mx-auto">
            Glimpses of a legendary journey. Click a memory portal to view the transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto p-4">
          {sagaConfig.gallery.map((item, i) => {
            const { accent, glow } = getAccent(item.color);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.86 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -10, 0] }}
                transition={{ delay: i * 0.1, duration: 0.5, y: { repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" } }}
                className="memory-portal-card energy-border h-[340px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-electric-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-space-navy md:h-[390px]"
                style={{
                  '--memory-accent': accent,
                  '--memory-glow': glow,
                } as React.CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={`Open memory: ${item.title}`}
                onClick={() => handleOpen(i)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleOpen(i);
                  }
                }}
              >
                <TiltedCard
                  imageSrc={item.src}
                  altText={item.title}
                  captionText={item.caption}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  showMobileWarning={false}
                  showTooltip
                  displayOverlayContent
                  imageStyle={{ objectPosition: item.position }}
                  overlayContent={
                    <div className="flex h-full w-full flex-col justify-end rounded-lg bg-gradient-to-b from-space-navy/5 via-transparent to-space-navy/95 p-4">
                      <span className="mb-auto w-fit rounded-full border border-electric-cyan/40 bg-space-navy/70 px-2 py-1 power-level-text text-[8px]">
                        Data {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-display text-sm uppercase tracking-wider text-soft-white line-clamp-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs font-mono uppercase tracking-widest text-electric-cyan">
                        {item.caption}
                      </p>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-space-navy/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
          >
            <div className="absolute top-6 right-6 z-50">
              <button onClick={handleClose} className="p-2 text-soft-white hover:text-electric-cyan">
                <X size={32} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-cosmic-purple/50 border border-energy-blue/50 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(22,139,255,0.2)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-space-navy flex items-center justify-center relative border-b border-energy-blue/30">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-h-[75vh] w-full object-contain"
                  style={{ objectPosition: selectedItem.position }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button onClick={prevImg} className="p-2 bg-space-navy/50 rounded-full hover:bg-energy-blue/30 text-white backdrop-blur-sm">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImg} className="p-2 bg-space-navy/50 rounded-full hover:bg-energy-blue/30 text-white backdrop-blur-sm">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-8 text-center bg-gradient-to-b from-cosmic-purple/50 to-space-navy">
                <h3 className="text-2xl md:text-3xl font-display text-transformation-gold uppercase tracking-widest mb-2 text-glow">
                  {selectedItem.title}
                </h3>
                <p className="text-energy-blue font-mono uppercase tracking-widest text-sm">
                  {selectedItem.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
