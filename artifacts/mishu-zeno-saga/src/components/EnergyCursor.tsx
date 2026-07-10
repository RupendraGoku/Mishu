import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from './ReducedMotionProvider';

export const EnergyCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      
      // Lerp for smooth trail
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }
      
      requestAnimationFrame(updateCursor);
    };
    
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null; // hide on mobile
  }

  if (prefersReducedMotion) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-electric-cyan rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-75 -ml-2 -mt-2 shadow-[0_0_10px_#49E8FF]"
      />
      <div 
        ref={trailRef}
        className="fixed top-0 left-0 w-12 h-12 border border-energy-blue rounded-full pointer-events-none z-[9998] mix-blend-screen -ml-6 -mt-6 opacity-50 shadow-[0_0_20px_#168BFF_inset]"
      />
    </>
  );
};