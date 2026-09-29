import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { fireElegantWishConfetti } from '../utils/confetti';

export const BirthdayMomentSection: React.FC = () => {
  const [wishMade, setWishMade] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  const handleMakeWish = () => {
    setWishMade(true);
    fireElegantWishConfetti();

    // Spawn floating glowing hearts
    const hearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: 30 + Math.random() * 40,
      delay: Math.random() * 0.8,
    }));
    setFloatingHearts(hearts);
  };

  return (
    <section id="birthday-moment" className="relative py-16 sm:py-32 mobile-safe-padding px-4 sm:px-6 max-w-3xl mx-auto z-10 text-center w-full overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating spawned hearts upon wish */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
          }}
          className="absolute bottom-20 z-30 pointer-events-none animate-float-gentle text-rose-400"
        >
          <Heart className="w-5 h-5 fill-rose-500 text-rose-400 animate-ping" />
        </div>
      ))}

      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Birthday Moment</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Display: "Today is your day 🎂" */}
        <h2 className="font-serif-display font-bold text-rose-50 text-glow px-1 break-words [font-size:clamp(1.7rem,7vw,3.1rem)]">
          Today is your day 🎂
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto font-light leading-relaxed">
          Close your eyes, make a silent wish, and let today bring you endless happiness.
        </p>
      </div>

      {/* Animated Cake & Candle Centerpiece */}
      <div className="relative flex flex-col items-center justify-center mb-10">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Subtle halo glow behind cake */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-pink-500/20 to-amber-500/15 rounded-full blur-2xl animate-pulse" />

          {/* SVG Animated Birthday Cake */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            {/* Candle Flames with Flickering Animation */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flickering Flame */}
                  <div
                    className={`w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-white animate-candle-flicker transition-all duration-700 ${
                      wishMade ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
                    }`}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  {/* Candle Stick */}
                  <div className="w-1.5 h-6 bg-gradient-to-b from-rose-200 to-rose-400 rounded-t-sm shadow-sm" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-28 sm:w-32 h-10 rounded-t-xl bg-gradient-to-r from-rose-800 via-pink-700 to-rose-800 border border-rose-300/30 shadow-lg flex items-center justify-around px-2 overflow-hidden">
              <div className="w-full h-2 bg-pink-400/40 rounded-full blur-[1px] absolute top-1" />
              <Heart className="w-3 h-3 text-rose-300 fill-rose-300/50" />
              <Sparkles className="w-3 h-3 text-amber-200" />
              <Heart className="w-3 h-3 text-rose-300 fill-rose-300/50" />
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-40 sm:w-48 h-14 rounded-b-2xl bg-gradient-to-r from-rose-900 via-pink-800 to-rose-900 border-t border-rose-400/30 border-x border-b border-rose-950 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="w-full h-2.5 bg-rose-400/30 rounded-full blur-[1px] absolute top-1" />
              <div className="flex items-center gap-3">
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/40" />
                <span className="font-serif-display text-xs text-rose-200 tracking-wider">NIRUTHEE</span>
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/40" />
              </div>
            </div>

            {/* Golden Cake Stand */}
            <div className="w-48 sm:w-56 h-3 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 rounded-full shadow-lg mt-0.5 border border-amber-200/40" />
          </div>
        </div>
      </div>

      {/* Button & Wish Reveal */}
      {!wishMade ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleMakeWish}
            className="group relative inline-flex items-center justify-center gap-3 w-full max-w-xs px-9 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white font-medium text-base shadow-xl shadow-rose-900/60 hover:shadow-rose-600/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="font-semibold tracking-wide">Make a Wish ✨</span>
            <Heart className="w-4 h-4 text-rose-200 group-hover:scale-125 transition-transform" />
          </button>
        </div>
      ) : (
        /* The Wish Message */
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-glow border-2 border-rose-400/40 shadow-2xl shadow-rose-950/90 animate-fadeIn max-w-xl mx-auto w-full">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-950 animate-bounce">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <p className="font-serif-display font-bold text-rose-50 text-glow leading-snug break-words [font-size:clamp(1.25rem,5.6vw,2.25rem)]">
            "May all the beautiful things you wish for find their way to you. ❤️"
          </p>

          <p className="mt-4 text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            Here's to another wonderful year filled with joy, laughter, and endless good things.
          </p>

          <div className="mt-6 pt-4 border-t border-rose-500/20">
            <button
              onClick={handleMakeWish}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 min-h-[44px] rounded-full glass-card hover:border-rose-400/50 text-xs font-medium text-rose-300 hover:text-white transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Make another wish ✨</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
