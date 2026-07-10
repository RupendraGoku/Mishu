import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import { Lock, Unlock } from 'lucide-react';

export const SpecialMessage: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const { playSfx, setBgmTheme } = useAudio();

  const handleUnlock = () => {
    playSfx('powerUp');
    setUnlocked(true);
    setBgmTheme('calm');
  };

  return (
    <section className="py-32 bg-gradient-to-b from-space-navy via-cosmic-purple to-space-navy relative overflow-hidden">
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