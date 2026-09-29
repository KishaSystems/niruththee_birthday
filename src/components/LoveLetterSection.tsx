import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Exact letter provided in prompt - Tamil-English preserved verbatim
  const fullLetter = `Dear Niruththee,

enakku theriyum naan unnoda kathikkirathu illa irunthalum nee enna irukka vidamatta naan summa irunthalum messages calls panni konde iruppa nee enna care panntha naale illa sinna pillayual mathiri adam pidippa enkooda sanda poduva ithellame enakku un mela pudikkum naan oru naalikku ethana thadava unda phota va mattum paathuttu iruppan theriyuma nee enakku god thantha gift niruththeeee.

Happy Birthday, my love.

— Kishalan ❤️`;

  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    timerRef.current = window.setInterval(() => {
      currentIndex += 2; // smooth pace
      if (currentIndex >= fullLetter.length) {
        setDisplayedText(fullLetter);
        setIsTypingComplete(true);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setDisplayedText(fullLetter.slice(0, currentIndex));
      }
    }, 28);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  const handleOpenLetter = () => {
    setIsOpen(true);
    fireHeartConfetti();
  };

  const handleShowAll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(fullLetter);
    setIsTypingComplete(true);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  return (
    <section id="letter" className="relative py-16 sm:py-24 mobile-safe-padding px-4 sm:px-6 max-w-3xl mx-auto z-10 w-full overflow-x-hidden">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-wide mb-3">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>From My Heart</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          A Letter For You
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto">
          From someone who is very dramatic
        </p>
      </div>

      {/* Interactive Letter Envelope / Display */}
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <div
            onClick={handleOpenLetter}
            className="group relative w-full max-w-md p-7 sm:p-10 rounded-3xl glass-panel-glow border-2 border-rose-400/40 text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-rose-300 shadow-2xl shadow-rose-950/80 min-h-[44px]"
          >
            {/* Wax Seal Badge */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-700 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-950 border border-rose-300/40 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-white animate-pulse" />
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-display font-semibold text-rose-100">
              For Niruththee's Eyes Only 💌
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-rose-200/70 font-light">
              Tap to unseal and read what I wrote for you.
            </p>

            <div className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-colors">
              <span>Open Letter 🕊️</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full p-5 sm:p-10 rounded-3xl glass-panel-glow border border-rose-400/30 shadow-2xl shadow-rose-950/70 animate-fadeIn overflow-x-hidden">
          {/* Top Actions: Speed Up / Replay */}
          <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-rose-500/20 text-xs text-rose-300/70">
            <span className="flex items-center gap-1.5 font-medium text-rose-200 min-w-0">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/40 shrink-0" />
              <span className="truncate">Handwritten with Love</span>
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {!isTypingComplete && (
                <button
                  onClick={handleShowAll}
                  className="inline-flex items-center gap-1 px-2.5 py-2 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 text-rose-300 transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Read all</span>
                </button>
              )}
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1 px-2.5 py-2 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 text-rose-300 transition-colors cursor-pointer"
                title="Replay typewriter"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replay</span>
              </button>
            </div>
          </div>

          {/* Letter Body - Typewriter style with natural line breaks */}
          <div className="font-serif-display text-[clamp(0.95rem,3.8vw,1.25rem)] sm:text-lg md:text-xl text-rose-100/90 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide break-words">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Emotional footer stamp */}
          {isTypingComplete && (
            <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <span className="text-xs text-rose-300/60 font-light italic break-words">
                P.S. Yes, I really look at your photo that many times a day. 🥹
              </span>
              <div className="text-right">
                <span className="font-handwriting text-2xl text-rose-300 text-glow">
                  Kishalan
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
