import React, { useState } from 'react';
import { AudioProvider } from './components/AudioProvider';
import { ReducedMotionProvider } from './components/ReducedMotionProvider';
import { BirthdayLoader } from './components/BirthdayLoader';
import { SoundControls } from './components/SoundControls';
import { AnimeNavbar } from './components/AnimeNavbar';
import { HeroSaga } from './components/HeroSaga';
import { BirthdayCountdown } from './components/BirthdayCountdown';
import { EpisodeTransition } from './components/EpisodeTransition';
import { SagaTimeline } from './components/SagaTimeline';
import { MemoryUniverse } from './components/MemoryUniverse';
import { PowerScanner } from './components/PowerScanner';
import { EnergyChallenge } from './components/EnergyChallenge';
import { WishWall } from './components/WishWall';
import { SpecialMessage } from './components/SpecialMessage';
import { SevenWishOrbs } from './components/SevenWishOrbs';
import { FinalCelebration } from './components/FinalCelebration';
import { CelebrationFooter } from './components/CelebrationFooter';
import { ParticleCanvas } from './components/ParticleCanvas';
import { EnergyCursor } from './components/EnergyCursor';
import { AnimatePresence, MotionConfig } from 'framer-motion';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <ReducedMotionProvider>
      <MotionConfig reducedMotion="user">
        <AudioProvider started={started}>
        {!started ? (
          <BirthdayLoader onStart={() => setStarted(true)} />
        ) : (
          <div className="relative w-full overflow-x-hidden selection:bg-energy-blue selection:text-white">
            <ParticleCanvas />
            <EnergyCursor />
            <SoundControls />
            <AnimeNavbar />
            
            <main>
              <HeroSaga />
              <BirthdayCountdown />
              
              <EpisodeTransition number="01" title="The Celebration Awakens" />
              <SagaTimeline />
              
              <EpisodeTransition number="02" title="Memories Beyond Time" />
              <MemoryUniverse />
              <PowerScanner />
              
              <EpisodeTransition number="03" title="The Ultimate Power of Friendship" />
              <EnergyChallenge />
              <WishWall />
              <SpecialMessage />
              
              <EpisodeTransition number="FINAL" title="The Wish That Reached the Stars" />
              <SevenWishOrbs />
              <FinalCelebration />
            </main>
            
            <CelebrationFooter />
          </div>
        )}
      </AudioProvider>
      </MotionConfig>
    </ReducedMotionProvider>
  );
}

export default App;