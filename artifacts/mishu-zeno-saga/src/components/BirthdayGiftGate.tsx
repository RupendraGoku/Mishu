import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, LockKeyhole, Sparkles } from 'lucide-react';

import { sagaConfig } from '../config/saga';
import { useReducedMotion } from './ReducedMotionProvider';

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (targetTime: number): TimeLeft => {
  const total = Math.max(targetTime - Date.now(), 0);

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
  };
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="min-w-0">
    <div className="scouter-panel energy-border relative flex h-20 items-center justify-center overflow-hidden clip-button md:h-28">
      <div className="absolute inset-0 bg-energy-blue/10" />
      <div className="absolute -inset-8 speed-line-field opacity-25" />
      <span className="relative z-10 font-display text-3xl text-electric-cyan text-glow-blue md:text-5xl">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <div className="mt-3 text-center power-level-text text-[9px] md:text-xs">
      {label}
    </div>
  </div>
);

const burstRays = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2;
  const distance = index % 2 === 0 ? 118 : 92;

  return {
    angle: (angle * 180) / Math.PI,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
});

export const BirthdayGiftGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const prefersReducedMotion = useReducedMotion();
  const targetTime = useMemo(() => new Date(sagaConfig.birthdayDate).getTime(), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetTime));
  const [isOpening, setIsOpening] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const unlockStartedRef = useRef(false);
  const lastTapRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const openGift = useCallback(() => {
    if (unlockStartedRef.current) return;
    unlockStartedRef.current = true;
    setIsOpening(true);
    setBurstKey((key) => key + 1);

    if (!prefersReducedMotion) {
      confetti({
        particleCount: 170,
        spread: 100,
        startVelocity: 58,
        origin: { y: 0.58 },
        colors: ['#FFD43B', '#FF7A00', '#49E8FF', '#168BFF', '#E73131'],
      });

      confetti({
        particleCount: 90,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.78 },
        colors: ['#FFD43B', '#FF7A00', '#49E8FF'],
      });

      confetti({
        particleCount: 90,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.78 },
        colors: ['#FFD43B', '#FF7A00', '#49E8FF'],
      });
    }

    timeoutRef.current = window.setTimeout(
      onUnlock,
      prefersReducedMotion ? 450 : 2200,
    );
  }, [onUnlock, prefersReducedMotion]);

  const handleGiftPointerUp = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (isOpening) return;

      const now = window.performance.now();
      const isDoubleTap = now - lastTapRef.current <= 380;
      lastTapRef.current = isDoubleTap ? 0 : now;

      if (isDoubleTap) {
        event.preventDefault();
        openGift();
      }
    },
    [isOpening, openGift],
  );

  const handleGiftKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      openGift();
    },
    [openGift],
  );

  useEffect(() => {
    const updateCountdown = () => {
      const nextTimeLeft = getTimeLeft(targetTime);
      setTimeLeft(nextTimeLeft);

      if (nextTimeLeft.total <= 0) {
        openGift();
      }
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [openGift, targetTime]);

  return (
    <main className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center overflow-hidden bg-space-navy bg-stars px-4 py-8 text-soft-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,212,59,0.20),transparent_26rem),radial-gradient(circle_at_20%_78%,rgba(73,232,255,0.20),transparent_24rem),linear-gradient(180deg,rgba(38,20,71,0.74),rgba(5,8,22,0.96))]" />
      <div className="absolute inset-0 scouter-grid opacity-25" />
      <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 speed-line-field opacity-20" />

      <section className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-7 flex items-center gap-3 rounded-full border border-energy-blue/40 bg-space-navy/70 px-4 py-2 text-electric-cyan shadow-[0_0_28px_rgba(22,139,255,0.20)] backdrop-blur"
        >
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase md:text-xs">
            Gift sealed until {sagaConfig.birthdayUnlockLabel}
          </span>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Double tap the birthday gift to open it now"
          className="relative mb-8 h-52 w-56 appearance-none bg-transparent p-0 outline-none md:h-64 md:w-72"
          onPointerUp={handleGiftPointerUp}
          onDoubleClick={(event) => {
            event.preventDefault();
            openGift();
          }}
          onKeyDown={handleGiftKeyDown}
          whileTap={isOpening ? undefined : { scale: 0.96 }}
        >
          {isOpening && !prefersReducedMotion && (
            <motion.div
              key={burstKey}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.05, ease: 'easeOut' }}
            >
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute h-28 w-28 rounded-full border-2 border-electric-cyan/80 shadow-[0_0_28px_rgba(73,232,255,0.85)]"
                  initial={{ scale: 0.35, opacity: 0.95 }}
                  animate={{ scale: 2.2 + ring * 0.28, opacity: 0 }}
                  transition={{ duration: 0.9, delay: ring * 0.08, ease: 'easeOut' }}
                />
              ))}

              {burstRays.map((ray, index) => (
                <motion.span
                  key={index}
                  className="absolute left-1/2 top-1/2 h-2 w-14 origin-left rounded-full bg-gradient-to-r from-transformation-gold via-flame-orange to-transparent shadow-[0_0_18px_rgba(255,212,59,0.85)]"
                  initial={{ x: 0, y: 0, rotate: ray.angle, scaleX: 0, opacity: 0 }}
                  animate={{ x: ray.x, y: ray.y, rotate: ray.angle, scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.85, delay: index * 0.012, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}

          <motion.div
            className="absolute left-1/2 top-6 z-20 h-16 w-64 -translate-x-1/2 rounded-md border border-transformation-gold/80 bg-gradient-to-r from-flame-orange via-transformation-gold to-flame-orange shadow-[0_0_34px_rgba(255,212,59,0.50)] md:h-20 md:w-80"
            animate={isOpening ? { y: -82, rotate: -11, opacity: 0 } : { y: [0, -5, 0] }}
            transition={isOpening ? { duration: 0.75, ease: 'easeOut' } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute left-1/2 top-0 h-full w-12 -translate-x-1/2 bg-electric-cyan/85 shadow-[0_0_18px_rgba(73,232,255,0.7)]" />
            <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-2">
              <div className="h-12 w-16 rounded-full border-4 border-transformation-gold bg-flame-orange/80 shadow-[0_0_16px_rgba(255,122,0,0.55)]" />
              <div className="h-12 w-16 rounded-full border-4 border-transformation-gold bg-flame-orange/80 shadow-[0_0_16px_rgba(255,122,0,0.55)]" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-1/2 h-40 w-56 -translate-x-1/2 overflow-hidden rounded-lg border border-transformation-gold/70 bg-gradient-to-br from-flame-orange via-transformation-gold to-flame-orange shadow-[0_0_42px_rgba(255,122,0,0.36)] md:h-48 md:w-72"
            animate={isOpening ? { scale: 1.08, opacity: 0 } : { scale: [1, 1.025, 1] }}
            transition={isOpening ? { duration: 1.05, ease: 'easeOut', delay: 0.35 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute left-1/2 top-0 h-full w-12 -translate-x-1/2 bg-electric-cyan/90 shadow-[0_0_20px_rgba(73,232,255,0.72)]" />
            <div className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2 bg-electric-cyan/90 shadow-[0_0_20px_rgba(73,232,255,0.72)]" />
            <div className="absolute inset-0 manga-halftone opacity-35" />
            <Gift className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-space-navy/70 md:h-20 md:w-20" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={isOpening ? { scale: [0.5, 1.4], opacity: [0, 1, 0] } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <Sparkles className="h-36 w-36 text-electric-cyan drop-shadow-[0_0_28px_rgba(73,232,255,0.95)]" />
          </motion.div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="w-full"
        >
          <p className="mb-3 power-level-text text-[10px] md:text-xs">
            Temporal scouter locked on midnight
          </p>
          <h1 className="mx-auto mb-5 max-w-4xl font-display text-4xl leading-tight text-transformation-gold text-glow md:text-7xl">
            {isOpening ? 'Birthday Gift Opening' : 'Birthday Saga Unlocks Soon'}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-6 text-soft-white/78 md:text-base">
            The Mishu x Zeno universe is sealed for the birthday moment. At 12:00 AM, the gift opens and the full celebration appears.
          </p>

          <div className="mx-auto grid w-full max-w-3xl grid-cols-4 gap-2 md:gap-4" role="timer" aria-live="polite">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Mins" />
            <TimeBlock value={timeLeft.seconds} label="Secs" />
          </div>

          <div className="mx-auto mt-8 h-1 w-full max-w-md overflow-hidden rounded-full bg-energy-blue/20">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-cyan via-transformation-gold to-flame-orange"
              animate={{ x: isOpening ? ['-100%', '0%'] : ['-100%', '100%'] }}
              transition={{ duration: isOpening ? 0.8 : 2.2, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
};
