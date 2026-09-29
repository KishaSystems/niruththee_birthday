import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

interface HeroSectionProps {
  onNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNext }) => {
  const handleScrollClick = () => {
    fireHeartConfetti();
    onNext();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center mobile-safe-padding px-4 sm:px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-20 z-10 overflow-hidden w-full max-w-full"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(280px,80vw)] sm:w-[600px] h-[min(280px,80vw)] sm:h-[600px] bg-rose-600/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(220px,70vw)] sm:w-[450px] h-[min(220px,70vw)] sm:h-[450px] bg-purple-700/15 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none" />

      <div className="relative mb-5 sm:mb-6 inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-rose-500/25 blur-xl animate-pulse"></div>
        <div className="relative p-3 sm:p-4 rounded-full bg-[#1b0825]/90 border border-rose-400/40 text-rose-300 shadow-2xl shadow-rose-950/90 animate-float-gentle backdrop-blur-md">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-500 text-rose-400 animate-heartbeat" />
        </div>
      </div>

      <p className="hero-names font-serif-display font-semibold text-rose-100 tracking-wide text-glow-soft mb-3 sm:mb-4 px-2 w-full break-words [font-size:clamp(1.15rem,5.2vw,1.85rem)]">
        Kishalan &amp; Niruthee
      </p>

      <h1 className="hero-title font-serif-display font-bold text-rose-50 tracking-tight leading-[1.12] max-w-3xl mx-auto text-glow break-words w-full px-1 animate-fadeIn [font-size:clamp(1.85rem,8vw,4.5rem)]">
        Happy Birthday, Niruthee! ❤️
      </h1>

      <p className="mt-4 sm:mt-5 text-[clamp(0.9rem,3.6vw,1.25rem)] text-rose-200/90 font-light max-w-md mx-auto leading-relaxed px-2 font-serif-display italic tracking-wide text-glow-soft">
        "Today is all about you."
      </p>

      <p className="mt-2 text-[clamp(0.7rem,3vw,0.9rem)] text-rose-300/70 max-w-sm mx-auto font-light leading-relaxed px-3">
        A quiet celebration of everything that makes you so genuinely special to me.
      </p>

      <div className="mt-8 sm:mt-10 flex flex-col items-center w-full max-w-sm px-2">
        <button
          onClick={handleScrollClick}
          className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:via-pink-500 hover:to-rose-500 text-white font-medium text-sm sm:text-base shadow-xl shadow-rose-900/50 hover:shadow-rose-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[48px]"
        >
          <span className="font-semibold tracking-wide">Begin The Journey ❤️</span>
          <ChevronDown className="w-4 h-4 text-rose-200 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <span className="text-[11px] text-rose-400/60 mt-3 tracking-widest uppercase font-light">
          Scroll down to explore
        </span>
      </div>
    </section>
  );
};
