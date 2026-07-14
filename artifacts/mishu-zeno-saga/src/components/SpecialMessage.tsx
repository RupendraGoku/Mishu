import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import { Lock, Unlock } from 'lucide-react';

export const SpecialMessage: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const { playSfx, setBgmTheme } = useAudio();
  const letterImages = sagaConfig.gallery.slice(5, 7);

  const handleUnlock = () => {
    playSfx('powerUp');
    setUnlocked(true);
    setBgmTheme('calm');
  };

  return (
    <section className="py-32 bg-gradient-to-b from-space-navy via-cosmic-purple to-space-navy relative overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}image/bg.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
      />
      <div className="absolute inset-0 bg-space-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy/50 via-cosmic-purple/20 to-space-navy/55" />
      {/* Soft sunset/peaceful particles effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-cosmic-purple)_0%,_transparent_70%)] opacity-60" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-display text-soft-white uppercase tracking-widest mb-12 drop-shadow-md"
        >
          Not Every Strength Is Measured by a Power Level
        </motion.h2>

        <div className="space-y-6 text-lg md:text-xl text-soft-white/80 font-medium leading-relaxed mb-16">
          {sagaConfig.personalLetter.intro.split('. ').map((sentence, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              {sentence}{i < sagaConfig.personalLetter.intro.split('. ').length - 1 ? '.' : ''}
            </motion.p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {letterImages.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg border border-electric-cyan/40 bg-space-navy shadow-[0_0_24px_rgba(73,232,255,0.12)]"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: item.position }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-navy/95 to-transparent px-4 pb-4 pt-12 text-left">
                <span className="font-display text-sm uppercase tracking-widest text-transformation-gold">
                  {item.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {!unlocked ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnlock}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-energy-blue text-energy-blue font-display text-xl uppercase tracking-widest rounded-full hover:bg-energy-blue/10 hover:text-electric-cyan hover:border-electric-cyan transition-all group"
          >
            <Lock size={20} className="group-hover:hidden" />
            <Unlock size={20} className="hidden group-hover:block" />
            Unlock Hidden Message
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, height: 0 }}
            animate={{ opacity: 1, scale: 1, height: 'auto' }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="mt-8 relative"
          >
            {/* Glowing Scroll Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-energy-blue/20 via-electric-cyan/20 to-energy-blue/20 blur-xl rounded-full" />
            
            <div className="bg-space-navy/80 border border-electric-cyan p-8 md:p-12 rounded-xl backdrop-blur-md relative shadow-[0_0_30px_rgba(73,232,255,0.2)]">
              <h3 className="font-display text-2xl text-electric-cyan uppercase tracking-widest mb-6">
                {sagaConfig.personalLetter.hiddenMessageTitle}
              </h3>
              <p className="text-soft-white leading-relaxed italic font-serif text-lg">
                "{sagaConfig.personalLetter.hiddenMessageBody}"
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
