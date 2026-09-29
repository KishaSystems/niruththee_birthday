import React, { useState } from 'react';
import { Heart, ArrowUp, Send } from 'lucide-react';
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
    <footer id="final" className="relative min-h-[90dvh] flex flex-col items-center justify-center text-center mobile-safe-padding px-4 sm:px-6 py-20 sm:py-32 z-10 w-full overflow-x-hidden" style={{ paddingBottom: 'max(5rem, env(safe-area-inset-bottom))' }}>
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-gradient-to-tr from-purple-950/30 via-rose-900/25 to-transparent blur-[140px] pointer-events-none" />

      {/* Large Glowing Heart Animation */}
      <div className="relative mb-8 inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl animate-pulse"></div>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#1b0825] to-[#2e0b3b] border-2 border-rose-400/50 flex items-center justify-center shadow-2xl shadow-rose-950 animate-float-gentle backdrop-blur-md">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-rose-500 text-rose-400 animate-pulse-slow filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
        </div>
      </div>

      {/* Large Text: Happy Birthday, Niruthee ❤️ */}
      <h2 className="font-serif-display font-bold text-rose-50 leading-[1.12] max-w-2xl mx-auto text-glow break-words px-1 [font-size:clamp(1.85rem,8vw,4.75rem)]">
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent">
          Niruthee ❤️
        </span>
      </h2>

      {/* Under it: "From Kishalan, with a little piece of my heart." */}
      <p className="mt-5 text-base sm:text-lg md:text-xl font-serif-display italic text-rose-200/90 tracking-wide text-glow-soft max-w-md mx-auto">
        From Kishalan, with a little piece of my heart.
      </p>

      {/* Then show: "Thank you for being you." */}
      <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-serif-display font-semibold text-rose-100 text-glow tracking-wider">
        "Thank you for being you."
      </p>

      {/* Interactive Micro-Action: Send Virtual Hug */}
      <div className="mt-10 mb-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm sm:max-w-none px-1">
        <button
          onClick={handleSendHug}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            hugSent
              ? 'bg-rose-500/30 border border-rose-400 text-rose-100'
              : 'glass-panel-glow border border-rose-400/40 text-rose-200 hover:text-white hover:scale-105 active:scale-95 shadow-lg shadow-rose-950'
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full glass-card hover:border-rose-400/50 text-sm font-medium text-rose-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Top ⬆️</span>
        </button>
      </div>

      {/* Bottom Stamp: Made with ❤️ by Kishalan */}
      <div className="pt-8 border-t border-rose-500/20 text-center">
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 text-glow">
          Made with ❤️ by Kishalan
        </p>
        <p className="mt-1 text-[11px] text-rose-400/40 tracking-widest uppercase font-mono">
          September 2026 • Forever & Always
        </p>
      </div>
    </footer>
  );
};
