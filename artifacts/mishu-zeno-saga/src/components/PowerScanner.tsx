import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sagaConfig } from '../config/saga';
import { useAudio } from './AudioProvider';
import { Scan, Activity, Zap } from 'lucide-react';

export const PowerScanner: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const { playSfx } = useAudio();

  const handleScan = () => {
    if (scanning || scanned) return;
    setScanning(true);
    playSfx('energyCharge');
    
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      playSfx('powerUp');
    }, 2000);
  };

  const StatBar = ({ label, value, percentage, delay }: { label: string, value: string, percentage: number, delay: number }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-mono uppercase text-soft-white mb-1">
        <span>{label}</span>
        <span className={percentage >= 100 ? 'text-transformation-gold text-glow' : 'text-energy-blue'}>{value}</span>
      </div>
      <div className="h-2 bg-space-navy rounded-full overflow-hidden border border-energy-blue/20">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: scanned ? `${percentage}%` : '0%' }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${percentage >= 100 ? 'from-flame-orange to-transformation-gold shadow-[0_0_12px_var(--color-transformation-gold)]' : 'from-energy-blue to-electric-cyan shadow-[0_0_10px_var(--color-electric-cyan)]'}`}
        />
      </div>
    </div>
  );

  return (
    <section id="power" className="saga-section py-24 bg-gradient-to-b from-space-navy to-cosmic-purple relative overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}image/bg.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-space-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy/45 via-space-navy/10 to-cosmic-purple/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,8,22,0.62)_92%)]" />
      <div className="absolute inset-0 scouter-grid opacity-25" />

      <div className="container mx-auto px-4 saga-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-soft-white uppercase tracking-widest flex items-center justify-center gap-4">
            <Scan className="text-electric-cyan" size={40} />
            Official Power Scan
            <Scan className="text-electric-cyan" size={40} />
          </h2>
          <p className="mt-4 power-level-text text-[10px] md:text-xs">Dual subject scouter analysis</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 relative">
          {/* Decorative scanner line */}
          <AnimatePresence>
            {scanning && (
              <motion.div 
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1, repeat: 1, repeatType: "reverse", ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-electric-cyan shadow-[0_0_20px_var(--color-electric-cyan)] z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Profile 1 */}
          <div className="scouter-panel energy-border p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
               <Activity size={120} />
            </div>
            <h3 className="font-display text-3xl text-energy-blue uppercase tracking-widest mb-6 border-b border-energy-blue/20 pb-4">
              Subject: {sagaConfig.powerStats.person1.name}
            </h3>
            <div className="space-y-2">
              {sagaConfig.powerStats.person1.stats.map((stat, i) => (
                <StatBar key={i} {...stat} delay={i * 0.15} />
              ))}
            </div>
          </div>

          {/* Profile 2 */}
          <div className="scouter-panel energy-border p-6 rounded-lg relative overflow-hidden border-flame-orange/40">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none text-flame-orange">
               <Activity size={120} />
            </div>
            <h3 className="font-display text-3xl text-flame-orange uppercase tracking-widest mb-6 border-b border-flame-orange/20 pb-4">
              Subject: {sagaConfig.powerStats.person2.name}
            </h3>
            <div className="space-y-2">
              {sagaConfig.powerStats.person2.stats.map((stat, i) => (
                <StatBar key={i} {...stat} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          {!scanned ? (
            <button 
              onClick={handleScan}
              disabled={scanning}
              className="anime-cta px-8 py-4 bg-energy-blue text-space-navy font-display text-xl uppercase tracking-widest hover:bg-electric-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative aura-cyan"
            >
              {scanning ? 'Scanning...' : 'Initialize Scan'}
              {scanning && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
            </button>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-transformation-gold/10 border-2 border-transformation-gold p-8 rounded-xl max-w-2xl mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,212,59,0.1)_50%,transparent_75%)] bg-[length:10px_10px] animate-[slide_1s_linear_infinite]" />
              <div className="relative z-10">
                <Zap className="mx-auto text-transformation-gold mb-4" size={48} />
                <h3 className="font-display text-3xl md:text-4xl text-transformation-gold uppercase tracking-widest mb-2 text-glow">
                  Combined Power Level:
                </h3>
                <p className="font-mono text-xl text-soft-white uppercase tracking-widest">
                  Beyond Every Known Universe
                </p>
                <div className="mt-6 text-6xl font-display text-white text-glow-blue tracking-tighter">
                  {sagaConfig.names.short}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
