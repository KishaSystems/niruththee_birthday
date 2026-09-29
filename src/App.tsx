/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayer } from './components/AudioPlayer';
import { ScrollNotifications } from './components/ScrollNotifications';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MemoriesSection } from './components/MemoriesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { QuizSection } from './components/QuizSection';
import { ImpossibleButtonSection } from './components/ImpossibleButtonSection';
import { BirthdayMomentSection } from './components/BirthdayMomentSection';
import { FinalSection } from './components/FinalSection';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05010a] text-rose-100 selection:bg-rose-500/30 selection:text-rose-100 relative overflow-x-hidden">
      {/* Ambient background stars, nebula & floating romantic particles */}
      <BackgroundStars />

      {/* Opening Loading Screen */}
      {!hasEntered && (
        <OpeningScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Experience */}
      {hasEntered && (
        <>
          {/* Subtle scroll-based notifications from Kishalan */}
          <ScrollNotifications />

          {/* Minimal Floating Glass Music Player */}
          <AudioPlayer />

          {/* Continuous Romantic Story */}
          <main className="relative z-10 w-full max-w-full overflow-x-hidden pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]">
            {/* 1. Hero */}
            <HeroSection onNext={() => scrollToSection('journey')} />

            {/* 2. Our Little Journey */}
            <StorySection />

            {/* 3. Memories */}
            <MemoriesSection />

            {/* 4. Photo Gallery */}
            <PhotoGallerySection />

            {/* 5. Special Letter */}
            <LoveLetterSection />

            {/* 6. 3 Romantic Quizzes */}
            <QuizSection onComplete={() => scrollToSection('impossible-button')} />

            {/* 7. EXISTING GAME — UNTOUCHED */}
            <ImpossibleButtonSection onSuccess={() => scrollToSection('birthday-moment')} />

            {/* 8. Birthday Wish */}
            <BirthdayMomentSection />

            {/* 9. Final Message */}
            <FinalSection onScrollToTop={() => scrollToSection('hero')} />
          </main>
        </>
      )}
    </div>
  );
}
