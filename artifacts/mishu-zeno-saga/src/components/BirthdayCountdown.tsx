import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import { useReducedMotion } from './ReducedMotionProvider';
import confetti from 'canvas-confetti';

export const BirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isZero, setIsZero] = useState(false);
  const { playSfx } = useAudio();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const targetDate = new Date(sagaConfig.birthdayDate).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (!isZero) {
          setIsZero(true);
          playSfx('success');
          fireConfetti();
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isZero, playSfx]);

  const fireConfetti = () => {
    if (prefersReducedMotion) return;
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD43B', '#FF7A00', '#168BFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD43B', '#FF7A00', '#168BFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative w-16 h-16 md:w-24 md:h-24 bg-space-navy border-2 border-energy-blue flex items-center justify-center clip-button shadow-[0_0_15px_rgba(22,139,255,0.3)_inset] group">
        <div className="absolute inset-0 bg-energy-blue/10 group-hover:bg-energy-blue/20 transition-colors" />
        <span className="font-display text-2xl md:text-4xl text-electric-cyan font-bold tracking-wider z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-3 font-mono text-xs md:text-sm text-energy-blue uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );

  return (
    <section className="py-20 relative bg-space-navy/80 border-y border-energy-blue/20 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(22,139,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {!isZero ? (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display text-transformation-gold text-center mb-12 uppercase tracking-widest text-glow"
            >
              The Legendary Moment Arrives In
            </motion.h2>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center items-center"
            >
              <TimeBlock value={timeLeft.days} label="Days" />
              <div className="text-energy-blue font-display text-3xl mb-8 animate-pulse">:</div>
              <TimeBlock value={timeLeft.hours} label="Hours" />
              <div className="text-energy-blue font-display text-3xl mb-8 animate-pulse">:</div>
              <TimeBlock value={timeLeft.minutes} label="Mins" />
              <div className="text-energy-blue font-display text-3xl mb-8 animate-pulse">:</div>
              <TimeBlock value={timeLeft.seconds} label="Secs" />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-display text-transformation-gold text-glow uppercase tracking-widest mb-4">
              The Celebration Has Begun!
            </h2>
            <div className="w-full max-w-md mx-auto h-2 bg-gradient-to-r from-transparent via-flame-orange to-transparent mt-8" />
          </motion.div>
        )}
      </div>
    </section>
  );
};