import React from 'react';
import { Heart, Sparkles, ChevronDown, Cake } from 'lucide-react';
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
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 pb-16 z-10">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Animated Heart Badge */}
      <div className="relative mb-6 inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse"></div>
        <div className="relative p-3.5 sm:p-4 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-400 shadow-xl shadow-rose-950/80 animate-float-gentle">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-500 text-rose-400 animate-pulse-slow" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
        </div>
      </div>

      {/* Sub-kicker */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide mb-4">
        <Cake className="w-3.5 h-3.5 text-rose-400" />
        <span>A Special Gift From Kishalan</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>

      {/* Main Title - Mobile first clamp */}
      <h1 className="text-[clamp(2.4rem,8vw,4.5rem)] font-serif-display font-bold text-rose-50 tracking-tight leading-[1.08] max-w-3xl mx-auto text-glow text-balance">
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent">
          Niruththee! ❤️
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-sm sm:text-base md:text-lg text-rose-200/80 max-w-lg mx-auto leading-relaxed px-2 font-normal">
        Yes, I actually made a whole website for you. <br className="hidden sm:inline" />
        Please appreciate the effort. 😌😂
      </p>

      {/* CTA Button */}
      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={handleScrollClick}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-base shadow-xl shadow-rose-900/50 hover:shadow-rose-600/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer min-h-[48px]"
        >
          <span className="font-semibold tracking-wide">Let's Go 🎉</span>
          <ChevronDown className="w-5 h-5 text-rose-200 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <span className="text-[11px] text-rose-300/60 mt-3 tracking-wide">
          (Scroll down or tap to begin our little journey)
        </span>
      </div>
    </section>
  );
};
