import React, { useState } from 'react';
import { HelpCircle, Check, X, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { fireHeartConfetti, fireGrandCelebration } from '../utils/confetti';

interface QuizQuestionItem {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Exactly 3 questions as specified
  const questions: QuizQuestionItem[] = [
    {
      id: 1,
      question: 'What is my favorite thing to do with you?',
      options: [
        {
          text: 'Talk for hours until late night 🌙',
          isCorrect: true,
          feedback: 'Yes! And never getting tired of your voice ❤️',
        },
        {
          text: 'Annoy you until you get mad (and look cute) 😂',
          isCorrect: true,
          feedback: 'Haha 100% accurate! It is my primary life hobby 😌',
        },
        {
          text: 'Steal all your attention 24/7 🥺',
          isCorrect: true,
          feedback: 'Guilty as charged! You are my priority ✨',
        },
        {
          text: 'All of the above (especially annoying you) ❤️',
          isCorrect: true,
          feedback: 'PERFECT ANSWER! You know me too well 🥹😂',
        },
      ],
    },
    {
      id: 2,
      question: 'Who is more stubborn between us?',
      options: [
        {
          text: 'me',
          isCorrect: true,
          feedback: 'YES! Honesty looks beautiful on you! 😂🥇',
        },
        {
          text: 'Kishalan 😇',
          isCorrect: false,
          feedback: 'Lies detected! 🚨 Me? Stubborn? Never! Try again 😌',
        },
        {
          text: 'Both of us equally 🤷‍♀️',
          isCorrect: false,
          feedback: 'Nice try avoiding accountability! You know the real answer 😏',
        },
      ],
    },
    {
      id: 3,
      question: 'Who says sorry first?',
      options: [
        {
          text: 'me',
          isCorrect: true,
          feedback: 'CORRECT! Even if it takes a little drama first 😌❤️',
        },
        {
          text: 'Kishalan always 😌',
          isCorrect: false,
          feedback: 'I mean I might yield to your cute face, but the quiz says you! 😂',
        },
        {
          text: 'Neither, we just act like nothing happened 🤫',
          isCorrect: false,
          feedback: 'Haha too real! But pick the honest answer 🙃',
        },
      ],
    },
  ];

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showFeedback && currentQ.options[selectedOption!].isCorrect) return;

    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      fireHeartConfetti();
      setTimeout(() => {
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setSelectedOption(null);
          setShowFeedback(false);
        } else {
          setIsCompleted(true);
          fireGrandCelebration();
        }
      }, 1500);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-2xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
          <span>The Ultimate Girlfriend Test</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Since You're My Girlfriend... 👀
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/70">
          You should definitely know this.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-rose-400/30 shadow-2xl shadow-rose-950/70">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 text-xs text-rose-300">
            <span className="font-semibold uppercase tracking-wider">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIdx
                      ? 'bg-rose-500 shadow-sm shadow-rose-500'
                      : i < currentIdx
                      ? 'bg-emerald-500/80'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-serif-display font-semibold text-rose-100 mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const showResult = isSelected && showFeedback;

              let btnStyle =
                'border-white/10 bg-white/5 hover:bg-white/10 hover:border-rose-400/40 text-rose-100';

              if (showResult) {
                if (opt.isCorrect) {
                  btnStyle =
                    'border-emerald-400 bg-emerald-950/40 text-emerald-200 shadow-lg shadow-emerald-950';
                } else {
                  btnStyle =
                    'border-rose-500/80 bg-rose-950/50 text-rose-200 animate-shake';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full min-h-[52px] p-4 rounded-2xl border text-left text-sm sm:text-base font-medium flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer active:scale-[0.99] ${btnStyle}`}
                >
                  <span className="leading-snug">{opt.text}</span>
                  {showResult && (
                    <span className="flex-shrink-0">
                      {opt.isCorrect ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <X className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Teasing feedback note */}
          {showFeedback && selectedOption !== null && (
            <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-rose-500/20 text-center animate-fadeIn">
              <p
                className={`text-xs sm:text-sm font-medium ${
                  currentQ.options[selectedOption].isCorrect
                    ? 'text-emerald-300'
                    : 'text-rose-300'
                }`}
              >
                {currentQ.options[selectedOption].feedback}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Final celebration card */
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border-2 border-rose-400/40 text-center shadow-2xl shadow-rose-950 animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-900/50">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-rose-50 text-glow">
            You Know Me So Well! ❤️😂
          </h3>

          <p className="mt-3 text-sm text-rose-200/80 max-w-sm mx-auto leading-relaxed">
            100% girlfriend accuracy score verified. You truly understand my teasing ways.
          </p>

          <button
            onClick={handleRestart}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-rose-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </section>
  );
};
