import React, { useState } from 'react';
import { Heart, Laugh, Meh, Sparkles } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';

export const FunIntroSection: React.FC = () => {
  const [tappedCards, setTappedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setTappedCards(prev => ({ ...prev, [index]: !prev[index] }));
    fireHeartConfetti();
  };

  const cards = [
    {
      num: 1,
      badge: 'Reason #1 ❤️',
      headline: "You're cute.",
      subtext: "Like, annoyingly cute. Stop it.",
      icon: Heart,
      accent: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
      reaction: 'Stop making that cute face 🥹'
    },
    {
      num: 2,
      badge: 'Reason #2 😌',
      headline: "You're annoying.",
      subtext: "Exceptionally so, actually.",
      icon: Meh,
      accent: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      reaction: 'World champion at teasing Kishalan 🥇'
    },
    {
      num: 3,
      badge: 'Reason #3 😂',
      headline: "I still love you.",
      subtext: "Unfortunately. 🙃",
      icon: Laugh,
      accent: 'from-pink-500/20 to-amber-500/10 border-pink-500/30 text-pink-400',
      reaction: 'No refunds, no exchanges ❤️'
    },
  ];

  return (
    <section id="reasons" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>A Quick Disclaimer</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Before We Continue...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-200/75 max-w-md mx-auto">
          There are exactly 3 reasons I put up with you. 😌
        </p>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isTapped = !!tappedCards[idx];

          return (
            <div
              key={card.num}
              onClick={() => toggleCard(idx)}
              className={`group relative p-6 sm:p-7 rounded-3xl glass-card cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] ${
                isTapped ? 'border-rose-400/60 bg-rose-950/40 shadow-lg shadow-rose-900/40' : ''
              }`}
            >
              {/* Top pill/label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                  {card.badge}
                </span>
                <div className={`p-2 rounded-2xl bg-white/5 border border-white/10 ${card.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Main Headline */}
              <h3 className="text-xl sm:text-2xl font-serif-display font-semibold text-rose-100 group-hover:text-rose-200 transition-colors">
                {card.headline}
              </h3>

              {/* Subtext */}
              <p className="mt-2 text-sm text-rose-200/70 font-light leading-relaxed">
                {card.subtext}
              </p>

              {/* Interactive reveal on click */}
              <div className="mt-4 pt-3 border-t border-rose-500/10 flex items-center justify-between text-[11px] text-rose-400/80">
                <span>{isTapped ? card.reaction : 'Tap card 👆'}</span>
                <Heart className={`w-3.5 h-3.5 transition-transform duration-300 ${isTapped ? 'fill-rose-500 scale-125' : 'opacity-40'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Punchline */}
      <div className="mt-10 sm:mt-12 text-center">
        <div className="inline-block p-4 sm:p-5 rounded-2xl glass-panel-glow border border-rose-500/30">
          <p className="text-base sm:text-lg font-serif-display font-medium text-rose-100 tracking-wide text-glow">
            So I guess I'm stuck with you. ❤️
          </p>
        </div>
      </div>
    </section>
  );
};
