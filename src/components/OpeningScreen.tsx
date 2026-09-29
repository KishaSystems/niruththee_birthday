import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() * 8 + 4;
        return Math.min(100, prev + step);
      });
    }, 90);

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      audioManager.attemptAutoplay();
      setTimeout(() => {
        onEnter();
      }, 650);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onEnter]);

  const handleImmediateEnter = () => {
    setIsFadingOut(true);
    audioManager.attemptAutoplay();
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      onClick={handleImmediateEnter}
      className={`fixed inset-0 z-50 flex items-center justify-center mobile-safe-padding px-4 bg-[#05010a] cursor-pointer transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading surprise... tap to skip"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#05010a] via-[#15041f] to-[#05010a] pointer-events-none" />
      <div className="absolute w-[min(20rem,80vw)] h-[min(20rem,80vw)] sm:w-[480px] sm:h-[480px] rounded-full bg-rose-600/15 blur-[130px] -top-10 -left-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute w-[min(20rem,80vw)] h-[min(20rem,80vw)] sm:w-[480px] sm:h-[480px] rounded-full bg-purple-900/20 blur-[130px] -bottom-10 -right-10 pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-[#3b071e]/30 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <span className="loading-particle top-[18%] left-[12%]" style={{ animationDelay: '0.2s' }} />
      <span className="loading-particle top-[28%] right-[14%]" style={{ animationDelay: '0.8s', width: 6, height: 6 }} />
      <span className="loading-particle bottom-[22%] left-[18%]" style={{ animationDelay: '1.1s' }} />
      <span className="loading-particle bottom-[30%] right-[20%]" style={{ animationDelay: '0.4s', width: 4, height: 4 }} />
      <span className="loading-particle top-[48%] left-[8%]" style={{ animationDelay: '1.6s' }} />

      <div className="absolute top-[22%] left-[16%] text-rose-400/40 animate-float-gentle pointer-events-none">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-[24%] right-[18%] text-pink-400/40 animate-float-slow pointer-events-none">
        <Sparkles className="w-5 h-5 text-amber-300/40" />
      </div>
      <div className="absolute top-[35%] right-[22%] text-rose-500/30 animate-float-gentle pointer-events-none">
        <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
      </div>
      <div className="absolute bottom-[35%] left-[20%] text-rose-400/30 animate-float-slow pointer-events-none">
        <Heart className="w-4 h-4 fill-rose-400/20" />
      </div>

      <div className="relative max-w-sm w-full text-center flex flex-col items-center justify-center p-7 sm:p-10 rounded-3xl glass-panel-glow border border-rose-500/20 shadow-2xl shadow-rose-950/80">
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-900/80 via-[#260833] to-rose-600/80 border border-rose-400/40 flex items-center justify-center shadow-xl shadow-rose-950">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-heartbeat" />
          </div>
        </div>

        <h2 className="font-serif-display font-bold text-rose-50 tracking-wide text-glow mb-2 px-1 break-words [font-size:clamp(1.15rem,5.4vw,1.65rem)]">
          Kishalan ❤️ Niruthee
        </h2>

        <p className="text-[clamp(0.75rem,3.4vw,0.9rem)] text-rose-200/80 font-light tracking-wide mb-6 px-1">
          Preparing something special for you...
        </p>

        <div className="w-[min(14rem,78%)] h-1.5 bg-rose-950/80 rounded-full overflow-hidden border border-rose-500/20 shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-rose-600 via-pink-400 to-amber-300 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] text-rose-400/40 font-mono mt-3 tracking-widest uppercase">
          {progress < 100 ? `${Math.round(progress)}%` : 'Ready ❤️'}
        </span>
      </div>
    </div>
  );
};
