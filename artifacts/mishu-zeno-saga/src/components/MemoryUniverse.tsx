import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useAudio } from './AudioProvider';

export const MemoryUniverse: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const { playSfx } = useAudio();

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

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'border-energy-blue shadow-[0_0_20px_rgba(22,139,255,0.4)] hover:shadow-[0_0_30px_rgba(73,232,255,0.8)]';
      case 'gold': return 'border-transformation-gold shadow-[0_0_20px_rgba(255,212,59,0.4)] hover:shadow-[0_0_30px_rgba(255,212,59,0.8)]';
      case 'purple': return 'border-cosmic-purple shadow-[0_0_20px_rgba(38,20,71,0.4)] hover:shadow-[0_0_30px_rgba(100,50,150,0.8)]';
      case 'orange': return 'border-flame-orange shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:shadow-[0_0_30px_rgba(255,122,0,0.8)]';
      case 'cyan': return 'border-electric-cyan shadow-[0_0_20px_rgba(73,232,255,0.4)] hover:shadow-[0_0_30px_rgba(73,232,255,0.8)]';
      default: return 'border-soft-white';
    }
  };

  return (
    <section id="memories" className="py-24 bg-space-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-electric-cyan text-glow-blue uppercase tracking-widest">
            Memory Universe
          </h2>
          <p className="mt-4 text-soft-white/70 max-w-2xl mx-auto">
            Glimpses of a legendary journey. Click a memory portal to view the transmission.
          </p>
        </div>

        {/* Gallery Grid / Orbit layout (simplified to responsive masonry-style grid with floating animation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto p-4">
          {sagaConfig.gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: i * 0.1, duration: 0.5, y: { repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" } }}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 bg-cosmic-purple/30 flex flex-col items-center justify-center group ${getColorClass(item.color)}`}
              onClick={() => handleOpen(i)}
            >
              {/* Fake Photo Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-space-navy/50 to-transparent group-hover:opacity-0 transition-opacity z-10" />
              <ImageIcon size={48} className="text-soft-white/20 mb-4 z-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-space-navy/90 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="font-display text-soft-white uppercase tracking-wider text-sm truncate">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg !== null && (
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
              className="relative w-full max-w-4xl bg-cosmic-purple/50 border border-energy-blue/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(22,139,255,0.2)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-space-navy flex items-center justify-center relative border-b border-energy-blue/30">
                <ImageIcon size={64} className="text-soft-white/10" />
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
                  {sagaConfig.gallery[selectedImg].title}
                </h3>
                <p className="text-energy-blue font-mono uppercase tracking-widest text-sm">
                  {sagaConfig.gallery[selectedImg].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};