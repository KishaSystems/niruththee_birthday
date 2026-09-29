/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayer } from './components/AudioPlayer';
import { QuickNav } from './components/QuickNav';
import { HeroSection } from './components/HeroSection';
import { FunIntroSection } from './components/FunIntroSection';
import { MemoriesSection } from './components/MemoriesSection';
import { StorySection } from './components/StorySection';
import { AwardsSection } from './components/AwardsSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { QuizSection } from './components/QuizSection';
import { ImpossibleButtonSection } from './components/ImpossibleButtonSection';
import { GiftSection } from './components/GiftSection';
import { FinalSection } from './components/FinalSection';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for clean navigation highlights
  useEffect(() => {
    if (!hasEntered) return;

    const sections = ['hero', 'reasons', 'memories', 'story', 'awards', 'letter', 'quiz', 'impossible-button', 'gift', 'final'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08030d] text-rose-100 selection:bg-rose-500/30 selection:text-rose-100 relative">
      {/* Ambient background stars & romantic particles */}
      <BackgroundStars />

      {/* Opening Loading / Warning Screen */}
      {!hasEntered && (
        <OpeningScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Experience */}
      {hasEntered && (
        <>
          {/* Top Navigation */}
          <QuickNav activeSection={activeSection} onNavigate={scrollToSection} />

          {/* Persistent Floating Audio Player */}
          <AudioPlayer />

          {/* Content Container */}
          <main className="relative z-10 pt-16">
            {/* Section 1: Hero */}
            <HeroSection onNext={() => scrollToSection('reasons')} />

            {/* Section 2: Fun Intro (3 Reasons) */}
            <FunIntroSection />

            {/* Section 3: Memories Gallery & Lightbox */}
            <MemoriesSection />

            {/* Section 4: Our Story Timeline */}
            <StorySection />

            {/* Section 5: Official Girlfriend Awards */}
            <AwardsSection />

            {/* Section 6: Love Letter with Typewriter */}
            <LoveLetterSection />

            {/* Section 7: Fun Quiz */}
            <QuizSection />

            {/* Section 8: Impossible Button */}
            <ImpossibleButtonSection onSuccess={() => scrollToSection('gift')} />

            {/* Section 9: Birthday Gift Reveal */}
            <GiftSection onRevealed={() => scrollToSection('final')} />

            {/* Section 10: Final Closing & Signature */}
            <FinalSection onScrollToTop={() => scrollToSection('hero')} />
          </main>
        </>
      )}
    </div>
  );
}
