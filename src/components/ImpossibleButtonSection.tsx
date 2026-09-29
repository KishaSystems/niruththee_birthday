import React, { useState, useRef } from 'react';
import { Ban, Gift, Sparkles } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

interface ImpossibleButtonProps {
  onSuccess: () => void;
}

export const ImpossibleButtonSection: React.FC<ImpossibleButtonProps> = ({ onSuccess }) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const teaseMessages = [
    'Nice try 😂',
    'Nope.',
    'Almost!',
    "You really thought I'd let you click that? 😌",
    'Too fast for you! 🏃‍♂️💨',
    'Persistent, aren’t we? 😆',
  ];

  const dodge = (e?: React.MouseEvent | React.TouchEvent) => {
    if (isWon) return;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts >= 5) {
      setIsWon(true);
      setCurrentMessage('Okay okay... you win. ❤️🎉');
      setPosition({ x: 0, y: 0 });
      fireHeartConfetti();
      return;
    }

    // Pick random message
    const msg = teaseMessages[nextAttempts % teaseMessages.length];
    setCurrentMessage(msg);

    // Random safe offsets within bounded mobile box
    const maxOffset = 100;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset;
    setPosition({ x: randomX, y: randomY });
  };

  const handleContinue = () => {
    fireHeartConfetti();
    onSuccess();
  };

  return (
    <section id="impossible-button" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-xl mx-auto z-10 text-center">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          One Quick Thing Before We End... 😏
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/75">
          This is a completely normal button. Just don't click it.
        </p>
      </div>

      {/* Button Stage Area */}
      <div
        ref={containerRef}
        className="relative min-h-[220px] flex flex-col items-center justify-center p-6 rounded-3xl glass-panel-glow border border-rose-500/20 shadow-2xl"
      >
        {!isWon ? (
          <div className="flex flex-col items-center justify-center w-full">
            <button
              onMouseEnter={() => dodge()}
              onTouchStart={(e) => dodge(e)}
              onClick={(e) => dodge(e)}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-semibold text-sm sm:text-base shadow-xl shadow-red-950/70 border border-red-400/40 cursor-pointer active:scale-95 flex items-center gap-2 select-none"
            >
              <Ban className="w-4 h-4 text-red-200" />
              <span>🚫 Don't Click This</span>
            </button>

            {/* Teasing Message */}
            <div className="h-8 mt-6 flex items-center justify-center">
              {currentMessage && (
                <p className="text-xs sm:text-sm font-medium text-pink-300 animate-fadeIn">
                  {currentMessage}
                </p>
              )}
            </div>

            <span className="text-[11px] text-rose-300/50 mt-1">
              Attempt: {attempts} / 5
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="p-3 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 mb-3 animate-bounce">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>

            <p className="text-base sm:text-lg font-serif-display font-semibold text-rose-100 text-glow">
              Okay okay... you win. ❤️🎉
            </p>

            <p className="text-xs text-rose-200/70 mt-1 mb-6">
              You are officially too stubborn for my button to outsmart you.
            </p>

            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-rose-950 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
            >
              <Gift className="w-5 h-5 text-rose-200" />
              <span>Okay Fine, Let's Continue 🎁</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
