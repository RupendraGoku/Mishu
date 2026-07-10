import React, { createContext, useContext, useEffect, useState } from 'react';

const ReducedMotionContext = createContext(false);

export const useReducedMotion = () => useContext(ReducedMotionContext);

export const ReducedMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <div className={reducedMotion ? 'reduced-motion' : ''}>
        {children}
      </div>
    </ReducedMotionContext.Provider>
  );
};