import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './ReducedMotionProvider';

gsap.registerPlugin(ScrollTrigger);

const floaterAssets = [
  `${import.meta.env.BASE_URL}floter/f%20(1).png`,
  `${import.meta.env.BASE_URL}floter/f%20(2).png`,
  `${import.meta.env.BASE_URL}floter/f%20(3).png`,
  `${import.meta.env.BASE_URL}floter/f%20(4).png`,
];

const heroFloaters = [
  {
    src: floaterAssets[0],
    className: 'top-[18%] left-[7%] w-16 sm:w-20 md:w-24 opacity-90 drop-shadow-[0_0_18px_rgba(255,212,59,0.45)]',
  },
  {
    src: floaterAssets[1],
    className: 'top-[58%] right-[9%] w-20 sm:w-28 md:w-32 opacity-80 drop-shadow-[0_0_20px_rgba(73,232,255,0.35)]',
  },
  {
    src: floaterAssets[2],
    className: 'bottom-[14%] left-[17%] w-14 sm:w-18 md:w-20 opacity-85 drop-shadow-[0_0_18px_rgba(255,122,0,0.38)]',
  },
  {
    src: floaterAssets[3],
    className: 'top-[26%] right-[20%] w-12 sm:w-16 md:w-18 opacity-75 drop-shadow-[0_0_16px_rgba(255,212,59,0.35)]',
  },
];

export const HeroSaga: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const heroImage = sagaConfig.gallery[7];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { playSfx } = useAudio();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    // Parallax themed stickers with GSAP.
    const floaterTween = gsap.to(".themed-floater", {
      y: "random(-50, 50)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    return () => {
      floaterTween.kill();
    };
  }, [prefersReducedMotion]);

  const handleBegin = () => {
    playSfx('powerUp');
    document.querySelector('#saga')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnergy = () => {
    playSfx('energyCharge');
    document.querySelector('#wishes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      <motion.img
        src={heroImage.src}
        alt={heroImage.title}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
        style={{ y: yBg, objectPosition: heroImage.position }}
      />

      {/* Dynamic Sky Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-space-navy/95 via-cosmic-purple/70 to-flame-orange/30"
        style={{ y: yBg }}
      />
      
      {/* Dragon Constellation / Silhouette */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, var(--space-navy) 70%)' }}>
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl max-h-[80vh] drop-shadow-[0_0_15px_#FFD43B]">
          <path d="M 100 500 Q 200 400 300 450 T 500 300 T 700 200" fill="transparent" stroke="var(--transformation-gold)" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
          <circle cx="100" cy="500" r="4" fill="#FFD43B" />
          <circle cx="300" cy="450" r="6" fill="#FFD43B" />
          <circle cx="500" cy="300" r="5" fill="#FFD43B" />
          <circle cx="700" cy="200" r="8" fill="#FFD43B" />
          <circle cx="750" cy="150" r="3" fill="#FFD43B" />
          <path d="M 700 200 Q 750 150 780 180" fill="transparent" stroke="var(--transformation-gold)" strokeWidth="2" strokeDasharray="2,5" />
          {/* Abstract Dragon Head */}
          <polygon points="700,200 680,160 720,150 750,180" fill="transparent" stroke="#FFD43B" strokeWidth="1" className="opacity-70" />
        </svg>
      </div>

      {/* Themed floaters */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {heroFloaters.map((floater, index) => (
          <img
            key={floater.src}
            src={floater.src}
            alt=""
            aria-hidden="true"
            decoding="async"
            draggable="false"
            className={`themed-floater absolute h-auto select-none ${floater.className}`}
          />
        ))}
      </div>

      {/* Ground Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-space-navy to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 w-full h-[20vh] z-0 pointer-events-none"
        style={{
          background: 'polygon(0% 100%, 0% 50%, 20% 70%, 40% 40%, 60% 80%, 80% 30%, 100% 60%, 100% 100%)',
          backgroundColor: 'var(--space-navy)',
          clipPath: 'polygon(0% 100%, 0% 50%, 20% 70%, 40% 40%, 60% 80%, 80% 30%, 100% 60%, 100% 100%)'
        }}
      />
      
      {/* Two Warrior Silhouettes */}
      <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex items-end justify-center gap-12 z-0 opacity-80 mix-blend-plus-lighter">
         {/* Warrior 1 */}
         <div className="w-16 h-32 bg-energy-blue clip-slant relative blur-[2px]">
           <div className="absolute inset-0 bg-space-navy m-px clip-slant" />
         </div>
         {/* Warrior 2 */}
         <div className="w-20 h-36 bg-flame-orange clip-button relative blur-[2px] -scale-x-100">
           <div className="absolute inset-0 bg-space-navy m-px clip-button" />
         </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl"
        style={{ y: yText, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="inline-block mb-6 px-4 py-1 border border-transformation-gold/50 rounded-full bg-space-navy/50 backdrop-blur-md">
            <span className="font-mono text-sm text-transformation-gold tracking-widest uppercase shadow-[0_0_10px_rgba(255,212,59,0.5)]">
              Power Level: Unlimited
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-saiyan-right text-transparent bg-clip-text bg-gradient-to-br from-transformation-gold via-flame-orange to-crimson-red filter drop-shadow-[0_0_20px_rgba(255,122,0,0.8)] mb-4 uppercase leading-none transform -skew-x-6">
            {sagaConfig.heroMessage.title}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-display text-electric-cyan text-glow-blue mb-6 uppercase tracking-widest">
            {sagaConfig.heroMessage.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl text-soft-white/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-lg">
            {sagaConfig.heroMessage.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleBegin}
              className="group relative px-8 py-4 bg-transformation-gold text-space-navy font-display text-xl uppercase tracking-wider clip-button hover:bg-flame-orange hover:text-white transition-all w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full border-[3px] border-white/30 clip-button group-hover:scale-105 transition-transform opacity-0 group-hover:opacity-100" />
              Begin the Saga
            </button>
            <button 
              onClick={handleEnergy}
              className="group relative px-8 py-4 bg-transparent border-2 border-energy-blue text-energy-blue font-display text-xl uppercase tracking-wider clip-slant hover:bg-energy-blue/10 hover:text-electric-cyan transition-all w-full sm:w-auto hover:box-glow"
            >
              Send Your Energy
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
