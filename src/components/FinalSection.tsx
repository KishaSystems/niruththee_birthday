import React, { useState } from 'react';
import { Moon, Heart, Sparkles, ArrowUp, Send } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

interface FinalSectionProps {
  onScrollToTop: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onScrollToTop }) => {
  const [hugSent, setHugSent] = useState(false);

  const handleSendHug = () => {
    setHugSent(true);
    fireHeartConfetti();
  };

  return (
    <footer id="final" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 z-10">
      {/* Cinematic ambient background glow */}
      <div className="absolute w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-purple-900/20 via-rose-900/25 to-transparent blur-[120px] pointer-events-none" />

      {/* Floating Crescent Moon */}
      <div className="relative mb-6 inline-flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-amber-300 shadow-xl shadow-purple-950/80 animate-float-gentle">
          <Moon className="w-7 h-7 sm:w-8 sm:h-8 fill-amber-300/30" />
        </div>
      </div>

      <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-rose-300/80 mb-3">
        🌙 One Last Thing...
      </span>

      {/* Large Title */}
      <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-serif-display font-bold text-rose-50 leading-[1.1] max-w-2xl mx-auto text-glow">
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent">
          My Love
        </span>
      </h2>

      {/* Emotional message */}
      <div className="mt-8 max-w-xl mx-auto space-y-3 text-sm sm:text-base md:text-lg text-rose-200/85 font-light leading-relaxed px-4">
        <p>No matter how many birthdays come and go,</p>
        <p className="text-rose-100 font-normal">I hope I get to annoy you,</p>
        <p>make you laugh,</p>
        <p>make memories with you,</p>
        <p className="text-rose-100 font-medium">and celebrate many more birthdays together. ❤️</p>
      </div>

      {/* Signature */}
      <div className="mt-10 mb-12">
        <p className="font-serif-display text-2xl sm:text-3xl text-rose-300 tracking-wide text-glow font-semibold">
          — Kishalan 🌙
        </p>
      </div>

      {/* Interactive Micro-Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleSendHug}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            hugSent
              ? 'bg-rose-500/30 border border-rose-400 text-rose-100'
              : 'glass-panel-glow border border-rose-400/40 text-rose-200 hover:text-white hover:scale-105 active:scale-95'
          }`}
        >
          {hugSent ? (
            <>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-ping" />
              <span>Hug Sent to Kishalan! 🤗❤️</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-rose-400" />
              <span>Send Kishalan a Virtual Hug 🤗</span>
            </>
          )}
        </button>

        <button
          onClick={onScrollToTop}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card hover:border-rose-400/50 text-xs sm:text-sm font-medium text-rose-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Top ⬆️</span>
        </button>
      </div>

      <div className="mt-12 text-[11px] text-rose-400/40 tracking-wider">
        Crafted with love for Niruththee • September 2026
      </div>
    </footer>
  );
};
