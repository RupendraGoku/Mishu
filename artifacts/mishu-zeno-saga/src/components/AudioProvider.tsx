import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { sagaConfig } from '../config/saga';

interface AudioContextType {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  volume: number;
  toggleMusic: () => void;
  toggleSfx: () => void;
  setVolume: (v: number) => void;
  playSfx: (sound: keyof typeof sagaConfig.musicPaths) => void;
  setBgmTheme: (theme: 'epic' | 'calm') => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
};

export const AudioProvider: React.FC<{ children: React.ReactNode; started: boolean }> = ({ children, started }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [volume, setVolumeLevel] = useState(0.5);
  const [bgmTheme, setBgmTheme] = useState<'epic' | 'calm'>('epic');
  
  const bgmEpicRef = useRef<Howl | null>(null);
  const bgmCalmRef = useRef<Howl | null>(null);
  const sfxRefs = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // Initialize Howls
    bgmEpicRef.current = new Howl({
      src: [sagaConfig.musicPaths.background],
      loop: true,
      volume: 0,
      html5: true
    });
    
    bgmCalmRef.current = new Howl({
      src: [sagaConfig.musicPaths.calm],
      loop: true,
      volume: 0,
      html5: true
    });

    sfxRefs.current = {
      impact: new Howl({ src: [sagaConfig.musicPaths.impact], volume: 0.8 }),
      powerUp: new Howl({ src: [sagaConfig.musicPaths.powerUp], volume: 0.8 }),
      energyCharge: new Howl({ src: [sagaConfig.musicPaths.energyCharge], volume: 0.5 }),
      orbSound: new Howl({ src: [sagaConfig.musicPaths.orbSound], volume: 0.6 }),
      hover: new Howl({ src: [sagaConfig.musicPaths.hover], volume: 0.3 }),
      success: new Howl({ src: [sagaConfig.musicPaths.success], volume: 0.7 })
    };

    Howler.volume(volume);

    return () => {
      bgmEpicRef.current?.unload();
      bgmCalmRef.current?.unload();
      Object.values(sfxRefs.current).forEach(h => h.unload());
    };
  }, []);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  // Handle playing music when started
  useEffect(() => {
    if (!started || !musicEnabled) {
      bgmEpicRef.current?.fade(volume, 0, 1000);
      bgmCalmRef.current?.fade(volume, 0, 1000);
      
      setTimeout(() => {
        if (!musicEnabled) {
          bgmEpicRef.current?.pause();
          bgmCalmRef.current?.pause();
        }
      }, 1000);
      return;
    }

    const activeBgm = bgmTheme === 'epic' ? bgmEpicRef.current : bgmCalmRef.current;
    const inactiveBgm = bgmTheme === 'epic' ? bgmCalmRef.current : bgmEpicRef.current;

    if (activeBgm && !activeBgm.playing()) {
      activeBgm.play();
    }
    
    activeBgm?.fade(0, volume * 0.5, 2000);
    inactiveBgm?.fade(volume * 0.5, 0, 1000);
    setTimeout(() => {
      inactiveBgm?.pause();
    }, 1000);

  }, [started, musicEnabled, bgmTheme, volume]);

  const toggleMusic = () => setMusicEnabled(p => !p);
  const toggleSfx = () => setSfxEnabled(p => !p);
  const setVolume = (v: number) => setVolumeLevel(v);

  const playSfx = (sound: keyof typeof sagaConfig.musicPaths) => {
    if (!sfxEnabled || !started) return;
    if (sfxRefs.current[sound]) {
      sfxRefs.current[sound].play();
    }
  };

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        bgmEpicRef.current?.volume(volume * 0.1);
        bgmCalmRef.current?.volume(volume * 0.1);
      } else if (musicEnabled) {
        bgmEpicRef.current?.volume(volume * 0.5);
        bgmCalmRef.current?.volume(volume * 0.5);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [volume, musicEnabled]);

  return (
    <AudioContext.Provider value={{ musicEnabled, sfxEnabled, volume, toggleMusic, toggleSfx, setVolume, playSfx, setBgmTheme }}>
      {children}
    </AudioContext.Provider>
  );
};