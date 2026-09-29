import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, AlertTriangle } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Step 1 lasts 2.2 seconds then transitions to Step 2
    const timer = setTimeout(() => {
      setStep(2);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    // Trigger audio playback attempt on user gesture
    audioManager.attemptAutoplay();
    fireHeartConfetti();
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#08030d] transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-600/15 blur-3xl -top-10 -left-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-600/20 blur-3xl -bottom-10 -right-10 pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-[15%] text-rose-400/40 animate-float-gentle pointer-events-none">
        <Heart className="w-6 h-6 fill-rose-500/20" />
      </div>
      <div className="absolute bottom-1/4 right-[15%] text-amber-300/40 animate-float-gentle pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="relative max-w-md w-full text-center">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl glass-panel-glow border border-rose-500/20 shadow-2xl transition-all duration-500 animate-fadeIn">
            {/* Spinning cute loading spinner */}
            <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-rose-500/20 border-t-rose-400 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>

            <p className="text-lg sm:text-xl font-medium text-rose-100 tracking-wide text-glow">
              Preparing something very important... 👀
            </p>

            <div className="w-48 h-1.5 bg-rose-950/60 rounded-full mt-6 overflow-hidden border border-rose-500/20">
              <div className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full animate-[progress_2.2s_ease-in-out_infinite]" style={{ width: '85%' }}></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center p-7 sm:p-9 rounded-3xl glass-panel-glow border border-rose-400/30 shadow-2xl shadow-rose-950/70 transition-all duration-500 scale-100 animate-fadeIn">
            {/* Warning badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider mb-5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>WARNING ⚠️</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-display font-semibold text-rose-50 leading-relaxed text-glow mb-2">
              An extremely cute birthday girl has been detected. 🎂
            </h2>

            <p className="text-xs sm:text-sm text-rose-200/70 mt-1 mb-7 max-w-xs">
              System alerts indicate Niruththee is officially 1 year more gorgeous today.
            </p>

            {/* Main Entry Button */}
            <button
              onClick={handleEnterClick}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-medium text-base shadow-lg shadow-rose-600/40 hover:shadow-rose-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              <Heart className="w-5 h-5 text-rose-200 group-hover:scale-125 transition-transform duration-300 fill-rose-300/40" />
              <span className="font-semibold tracking-wide">Okay... Show Me 😌</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
