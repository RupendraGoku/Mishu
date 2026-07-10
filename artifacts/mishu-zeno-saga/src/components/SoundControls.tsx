import React from 'react';
import { Volume2, VolumeX, Music, Bell, BellOff } from 'lucide-react';
import { useAudio } from './AudioProvider';
import { motion, AnimatePresence } from 'framer-motion';

export const SoundControls = () => {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSfx, playSfx } = useAudio();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2">
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          playSfx('hover');
        }}
        className="h-12 w-12 rounded-full bg-space-navy border-2 border-energy-blue flex items-center justify-center text-energy-blue hover:text-electric-cyan hover:border-electric-cyan hover:box-glow transition-all active:scale-95"
        aria-label="Sound Controls"
      >
        {(musicEnabled || sfxEnabled) ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-2 p-3 bg-space-navy/90 backdrop-blur-md border border-energy-blue/50 rounded-xl"
          >
            <button
              onClick={() => {
                toggleMusic();
                playSfx('hover');
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm font-bold tracking-wider rounded-lg hover:bg-energy-blue/20 transition-colors uppercase"
            >
              <Music size={18} className={musicEnabled ? "text-electric-cyan" : "text-gray-500"} />
              <span className={musicEnabled ? "text-soft-white" : "text-gray-500"}>Music</span>
            </button>
            <button
              onClick={() => {
                toggleSfx();
                if (!sfxEnabled) playSfx('hover'); // play sound when turning ON
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm font-bold tracking-wider rounded-lg hover:bg-energy-blue/20 transition-colors uppercase"
            >
              {sfxEnabled ? <Bell size={18} className="text-electric-cyan" /> : <BellOff size={18} className="text-gray-500" />}
              <span className={sfxEnabled ? "text-soft-white" : "text-gray-500"}>SFX</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};