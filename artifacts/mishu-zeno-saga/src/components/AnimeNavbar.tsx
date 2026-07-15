import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';

export const AnimeNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');
  const { playSfx } = useAudio();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: "Home", href: "#hero" },
    { name: "Our Saga", href: "#saga" },
    { name: "Memories", href: "#memories" },
    { name: "Power Levels", href: "#power" },
    { name: "Birthday Wishes", href: "#wishes" },
    { name: "Final Wish", href: "#final" },
  ];

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: '-20% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    playSfx('hover');
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-space-navy/95 border-b border-energy-blue/30 backdrop-blur-sm py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="font-saiyan-left text-2xl text-transformation-gold tracking-widest text-glow cursor-pointer flex items-center gap-3" onClick={() => handleNavClick('#hero')}>
            <span>{sagaConfig.names.short}</span>
            <span className="hidden sm:inline-block h-2 w-16 overflow-hidden rounded-full border border-transformation-gold/40 bg-space-navy">
              <span className="block h-full w-3/4 bg-gradient-to-r from-flame-orange to-transformation-gold shadow-[0_0_8px_var(--color-transformation-gold)]" />
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const active = activeHref === link.href;

              return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative font-display uppercase tracking-wider transition-all text-sm lg:text-base ${active ? 'text-transformation-gold text-glow' : 'text-soft-white/80 hover:text-electric-cyan hover:text-glow-blue'}`}
              >
                {link.name}
                {active && <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-transformation-gold to-transparent" />}
              </a>
            );})}
          </nav>

          {/* Mobile Toggle */}
          <button 
            aria-label="Open scouter navigation"
            className="md:hidden text-energy-blue aura-cyan rounded-full p-1"
            onClick={() => {
              playSfx('hover');
              setMobileOpen(true);
            }}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* Mobile Menu - Scouter Style */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-50 bg-space-navy/95 backdrop-blur-md flex flex-col border-l-4 border-energy-blue scouter-grid"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(22, 139, 255, 0.1) 50%)', backgroundSize: '100% 4px' }} />
            
            <div className="p-6 flex justify-end">
              <button onClick={() => { playSfx('hover'); setMobileOpen(false); }} className="text-electric-cyan">
                <X size={40} />
              </button>
            </div>

            <div className="flex flex-col gap-6 px-12 py-8 mt-auto mb-auto relative z-10">
              <div className="text-xs text-electric-cyan font-mono mb-4 uppercase tracking-widest opacity-70">
                Scanning Targets...
              </div>
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`font-display text-3xl uppercase tracking-widest hover:pl-4 transition-all ${activeHref === link.href ? 'text-transformation-gold text-glow' : 'text-soft-white hover:text-electric-cyan'}`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="p-6 border-t border-energy-blue/30 text-center font-mono text-xs text-energy-blue uppercase">
              Power Scanner Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
