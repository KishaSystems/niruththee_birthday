import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Cake } from 'lucide-react';
import { fireGrandCelebration, fireHeartConfetti } from '../utils/confetti';

interface GiftSectionProps {
  onRevealed: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ onRevealed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    fireGrandCelebration();
    fireHeartConfetti();
    onRevealed();
  };

  return (
    <section id="gift" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-2xl mx-auto z-10 text-center">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-wide mb-3">
          <Gift className="w-3.5 h-3.5 text-rose-400" />
          <span>A Gift Wrapped For You</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Okay... One Last Thing. 🎁
        </h2>
      </div>

      {!isOpen ? (
        <div className="flex flex-col items-center">
          {/* Animated 3D-styled Gift Box */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-8 flex items-center justify-center animate-bounce duration-1000">
            <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl animate-pulse"></div>

            {/* Gift Box Base */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-500 shadow-2xl shadow-rose-950 border-2 border-rose-300/40 flex items-center justify-center">
              {/* Ribbon Vertical */}
              <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-sm"></div>
              {/* Ribbon Horizontal */}
              <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-sm"></div>

              {/* Bow on Top */}
              <div className="absolute -top-5 z-20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-amber-300 -mr-2 rotate-45 bg-amber-400/80 shadow-md"></div>
                <div className="w-8 h-8 rounded-full border-4 border-amber-300 -ml-2 -rotate-45 bg-amber-400/80 shadow-md"></div>
                <div className="absolute w-4 h-4 rounded-full bg-amber-200 border border-amber-400"></div>
              </div>

              <Cake className="relative z-10 w-8 h-8 text-white/90 drop-shadow" />
            </div>
          </div>

          {/* Open Button */}
          <button
            onClick={handleOpenGift}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-xl shadow-rose-900/60 hover:shadow-rose-600/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer min-h-[48px]"
          >
            <Gift className="w-5 h-5 text-rose-200 group-hover:rotate-12 transition-transform" />
            <span>Open Your Gift 🎁</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </button>
        </div>
      ) : (
        /* Revealed Gift Message */
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border-2 border-rose-400/40 shadow-2xl shadow-rose-950 animate-fadeIn">
          {/* Celebratory Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-rose-950 animate-bounce">
            <Heart className="w-8 h-8 fill-white" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow leading-snug">
            Happy Birthday, Niruththee ❤️🎂
          </h3>

          <div className="my-6 space-y-2 text-sm sm:text-base md:text-lg text-rose-200/90 font-light leading-relaxed max-w-md mx-auto">
            <p>You are my favorite person,</p>
            <p className="text-rose-300 font-medium">my favorite notification,</p>
            <p>my favorite conversation,</p>
            <p className="text-rose-300 font-medium">and unfortunately...</p>
            <p className="italic">my favorite headache too. 😂❤️</p>
          </div>

          <div className="pt-6 border-t border-rose-500/20">
            <p className="text-2xl sm:text-3xl font-serif-display font-bold bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent text-glow">
              I love you. ❤️
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
