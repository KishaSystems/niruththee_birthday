import React, { useState } from 'react';
import { Heart, Sparkles, Check, X, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

interface QuizItem {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctFeedback: string;
  incorrectFeedback: string;
}

interface RomanticQuizProps {
  onComplete?: () => void;
}

export const QuizSection: React.FC<RomanticQuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const quizzes: QuizItem[] = [
    {
      id: 1,
      question: 'Where did Kishalan first notice Niruthee?',
      options: [
        { letter: 'A', text: 'Puthukkudiyiruppu Central College', isCorrect: true },
        { letter: 'B', text: 'Vidhtyanatha School', isCorrect: false },
        { letter: 'C', text: 'University of Moratuwa', isCorrect: false },
        { letter: 'D', text: 'Dreamway office', isCorrect: false },
      ],
      correctFeedback: 'You remembered ❤️',
      incorrectFeedback: 'Almost 😌 Try to remember that first moment.',
    },
    {
      id: 2,
      question: 'Where did Kishalan and Niruthee first have a memorable conversation?',
      options: [
        { letter: 'A', text: 'During a Chemistry seminar', isCorrect: true },
        { letter: 'B', text: 'At a birthday party', isCorrect: false },
        { letter: 'C', text: 'At the beach', isCorrect: false },
        { letter: 'D', text: 'At university', isCorrect: false },
      ],
      correctFeedback: 'You remembered ❤️',
      incorrectFeedback: 'Almost 😌 Try to remember that Chemistry seminar practical.',
    },
    {
      id: 3,
      question: 'Who made this little birthday website?',
      options: [
        { letter: 'A', text: 'Google 😄', isCorrect: false },
        { letter: 'B', text: 'Your secret admirer 👀', isCorrect: false },
        { letter: 'C', text: 'Kishalan ❤️', isCorrect: true },
        { letter: 'D', text: 'Your best friend', isCorrect: false },
      ],
      correctFeedback: 'Of course you knew that ❤️',
      incorrectFeedback: 'Hey! It was Kishalan with all his heart 😌❤️',
    },
  ];

  const currentQuiz = quizzes[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;

    setSelectedIdx(idx);
    setHasAnswered(true);

    const isCorrect = currentQuiz.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      fireHeartConfetti();
    }
  };

  const handleNext = () => {
    if (currentIdx < quizzes.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="relative py-16 sm:py-28 mobile-safe-padding px-4 sm:px-6 max-w-2xl mx-auto z-10 w-full overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-950/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span>Romantic Quiz</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
        </div>
        <h2 className="font-serif-display font-bold text-rose-50 text-glow px-1 break-words [font-size:clamp(1.65rem,7vw,3rem)]">
          How Well Do You Know Us? ❤️
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto font-light leading-relaxed">
          Let's see if you remember our little story...
        </p>
      </div>

      {!isFinished ? (
        /* Quiz Card */
        <div className="w-full p-5 sm:p-9 rounded-3xl glass-panel-glow border border-rose-400/30 shadow-2xl shadow-rose-950/80 animate-fadeIn">
          {/* Top Progress Indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-500/20 text-xs text-rose-300">
            <span className="font-semibold uppercase tracking-wider font-mono">
              Question {currentIdx + 1} of {quizzes.length}
            </span>
            <div className="flex gap-2">
              {quizzes.map((_, i) => (
                <div
                  key={i}
                  className={`w-7 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIdx
                      ? 'bg-rose-500 shadow-sm shadow-rose-400'
                      : i < currentIdx
                      ? 'bg-pink-400/80'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif-display font-bold text-rose-100 mb-6 leading-snug">
            {currentQuiz.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const showResult = hasAnswered;

              let btnClasses =
                'border-rose-500/20 bg-white/5 hover:bg-rose-500/10 hover:border-rose-400/40 text-rose-100';

              if (showResult) {
                if (opt.isCorrect) {
                  btnClasses =
                    'border-emerald-400/80 bg-emerald-950/40 text-emerald-200 shadow-lg shadow-emerald-950';
                } else if (isSelected && !opt.isCorrect) {
                  btnClasses =
                    'border-rose-500 bg-rose-950/60 text-rose-200 animate-shake';
                } else {
                  btnClasses = 'opacity-40 border-white/5 bg-transparent text-rose-300/40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full min-h-[52px] p-4 rounded-2xl border text-left text-sm sm:text-base font-medium flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer active:scale-[0.99] select-none ${btnClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 min-w-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono text-rose-300 shrink-0">
                      {opt.letter}
                    </span>
                    <span className="leading-snug break-words">{opt.text}</span>
                  </div>

                  {showResult && (
                    <span className="flex-shrink-0">
                      {opt.isCorrect ? (
                        <Check className="w-5 h-5 text-emerald-400 animate-bounce" />
                      ) : isSelected ? (
                        <X className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Continue */}
          {hasAnswered && (
            <div className="mt-6 pt-5 border-t border-rose-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-center sm:text-left">
                {currentQuiz.options[selectedIdx!].isCorrect ? (
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                ) : (
                  <Heart className="w-4 h-4 text-rose-400 flex-shrink-0" />
                )}
                <p
                  className={`text-xs sm:text-sm font-serif-display text-base font-medium ${
                    currentQuiz.options[selectedIdx!].isCorrect
                      ? 'text-emerald-300 text-glow-soft'
                      : 'text-rose-300'
                  }`}
                >
                  {currentQuiz.options[selectedIdx!].isCorrect
                    ? currentQuiz.correctFeedback
                    : currentQuiz.incorrectFeedback}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-950 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{currentIdx < quizzes.length - 1 ? 'Next Question' : 'See Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* End of Quizzes Card */
        <div className="w-full p-7 sm:p-12 rounded-3xl glass-panel-glow border-2 border-rose-400/40 text-center shadow-2xl shadow-rose-950 animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-xl shadow-rose-900/50 animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-rose-50 text-glow mb-2">
            {score === 3 ? '3 / 3 ❤️' : `${score} / 3 ❤️`}
          </h3>

          <p className="mt-3 text-base sm:text-lg font-serif-display text-rose-100 max-w-md mx-auto leading-relaxed text-glow-soft">
            {score === 3
              ? 'You know our little story better than I expected.'
              : 'Looks like we need to make a few more memories 😌❤️'}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-full glass-card hover:border-rose-400/50 text-sm font-semibold text-rose-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Quizzes</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
