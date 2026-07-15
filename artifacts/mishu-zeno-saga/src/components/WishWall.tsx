import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User } from 'lucide-react';
import { useAudio } from './AudioProvider';

interface Wish {
  id: string;
  name: string;
  message: string;
  relation: string;
  date: string;
}

export const WishWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [relation, setRelation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playSfx } = useAudio();

  useEffect(() => {
    // Load demo wishes
    const saved = localStorage.getItem('saga_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      const initial = [
        { id: '1', name: 'Capsule Ally (Demo)', message: 'Happy Birthday you legends! Sending maximum celebration energy from across the universe.', relation: 'Ally', date: new Date().toISOString() }
      ];
      setWishes(initial);
      localStorage.setItem('saga_wishes', JSON.stringify(initial));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    playSfx('energyCharge');
    
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now().toString(),
        name,
        message,
        relation: relation || 'Friend',
        date: new Date().toISOString()
      };
      
      const updated = [newWish, ...wishes];
      setWishes(updated);
      localStorage.setItem('saga_wishes', JSON.stringify(updated));
      
      // TODO: Wire up actual API call here in the future
      // await fetch('/api/wishes', { method: 'POST', body: JSON.stringify(newWish) });
      
      setName('');
      setMessage('');
      setRelation('');
      setIsSubmitting(false);
      playSfx('success');
    }, 1000);
  };

  return (
    <section id="wishes" className="saga-section py-24 bg-space-navy relative overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}image/bg3.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-space-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy/45 via-space-navy/10 to-space-navy/55" />
      <div className="absolute inset-0 manga-halftone opacity-20" />

      <div className="container mx-auto px-4 max-w-6xl saga-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-transformation-gold uppercase tracking-widest text-glow">
            Messages From Across the Universe
          </h2>
          <p className="mt-4 power-level-text text-[10px] md:text-xs">Transmit Your Energy / Wish frequency open</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="scouter-panel energy-border p-6 rounded-xl sticky top-24">
              <h3 className="font-display text-2xl text-soft-white uppercase mb-6 flex items-center gap-2">
                <Send size={24} className="text-electric-cyan" />
                Send Transmission
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-energy-blue uppercase mb-1">Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={30}
                    required
                    className="w-full bg-space-navy/70 border border-energy-blue/30 rounded px-4 py-2 text-soft-white focus:outline-none focus:border-electric-cyan transition-colors font-sans"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-energy-blue uppercase mb-1">Relationship (Optional)</label>
                  <input 
                    type="text" 
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    maxLength={30}
                    className="w-full bg-space-navy/70 border border-energy-blue/30 rounded px-4 py-2 text-soft-white focus:outline-none focus:border-electric-cyan transition-colors font-sans"
                    placeholder="e.g. Training Partner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-energy-blue uppercase mb-1">Message</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={200}
                    required
                    rows={4}
                    className="w-full bg-space-navy/70 border border-energy-blue/30 rounded px-4 py-2 text-soft-white focus:outline-none focus:border-electric-cyan transition-colors font-sans resize-none"
                    placeholder="Send your birthday energy..."
                  />
                  <div className="text-right text-xs text-soft-white/50 mt-1">{message.length}/200</div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !message.trim()}
                  className="anime-cta w-full py-3 bg-energy-blue text-space-navy font-display text-lg uppercase tracking-wider hover:bg-electric-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden aura-cyan"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Transmitting...</span>
                  ) : (
                    <>Send <Send size={18} /></>
                  )}
                  {isSubmitting && <div className="absolute inset-0 bg-white/20 animate-[slide_1s_ease-in-out_infinite]" />}
                </button>
              </form>
            </div>
          </div>

          {/* Wall */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4 auto-rows-max">
              <AnimatePresence>
                {wishes.map((wish, i) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0.4, delay: i * 0.04 }}
                    className="scouter-panel energy-border border-l-4 border-electric-cyan p-5 rounded-r shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col relative group transition-colors"
                  >
                    <span className="dragon-orb absolute -left-3 -top-3 h-7 w-7 flex items-center justify-center text-[9px] text-crimson-red">★</span>
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <User size={40} />
                    </div>
                    <p className="text-soft-white/90 text-sm md:text-base leading-relaxed mb-4 relative z-10 italic">
                      "{wish.message}"
                    </p>
                    <div className="mt-auto flex justify-between items-end relative z-10">
                      <div>
                        <div className="font-display text-energy-blue uppercase tracking-wider">{wish.name}</div>
                        <div className="text-xs font-mono text-soft-white/50 uppercase">{wish.relation}</div>
                      </div>
                      <div className="text-[10px] font-mono text-soft-white/30">
                        {new Date(wish.date).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {wishes.length === 0 && (
              <div className="h-full flex items-center justify-center text-soft-white/50 font-mono uppercase text-sm border-2 border-dashed border-energy-blue/20 rounded-xl p-12">
                No transmissions received yet. Be the first!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
