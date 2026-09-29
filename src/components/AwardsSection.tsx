import React, { useState } from 'react';
import { Trophy, Sparkles, Smile, Heart, Flame, MessageSquare, Pizza, CheckCircle2 } from 'lucide-react';
import { AwardItem } from '../types';
import { fireHeartConfetti } from '../utils/confetti';

export const AwardsSection: React.FC = () => {
  const [claimedAwards, setClaimedAwards] = useState<Record<string, boolean>>({});

  const awards: AwardItem[] = [
    {
      id: 'best-smile',
      icon: 'smile',
      title: '🏆 Best Smile',
      quote: 'Absolutely unfair. How am I supposed to compete with that?',
      accent: 'from-amber-500/20 to-rose-500/20 border-amber-400/40 text-amber-300',
      badge: 'Unanimous 1st Place'
    },
    {
      id: 'most-adorable',
      icon: 'flower',
      title: '🌸 Most Adorable',
      quote: 'Unfortunately, you win every single time.',
      accent: 'from-pink-500/20 to-purple-500/20 border-pink-400/40 text-pink-300',
      badge: 'Undefeated Champion'
    },
    {
      id: 'professional-annoyer',
      icon: 'laugh',
      title: '😂 Professional Annoyer',
      quote: 'Nobody does it better.',
      accent: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/40 text-yellow-300',
      badge: 'Grandmaster Rank'
    },
    {
      id: 'best-talk',
      icon: 'chat',
      title: '💬 Best Person To Talk To',
      quote: 'Even when I have absolutely nothing to say.',
      accent: 'from-purple-500/20 to-indigo-500/20 border-purple-400/40 text-purple-300',
      badge: 'All-Day Favourite'
    },
    {
      id: 'food-thief',
      icon: 'pizza',
      title: '🍕 Most Likely To Steal My Food',
      quote: 'Yes. I noticed. Every single time.',
      accent: 'from-red-500/20 to-orange-500/20 border-red-400/40 text-red-300',
      badge: 'Caught in 4K 📸'
    },
    {
      id: 'person-around',
      icon: 'heart',
      title: '💖 Person I Want Around',
      quote: 'Always. No matter what. ❤️',
      accent: 'from-rose-500/30 to-pink-600/30 border-rose-400/50 text-rose-300',
      badge: 'Lifetime Contract'
    },
  ];

  const handleClaim = (id: string) => {
    setClaimedAwards(prev => ({ ...prev, [id]: !prev[id] }));
    fireHeartConfetti();
  };

  const getAwardIcon = (type: string) => {
    switch (type) {
      case 'smile':
        return <Smile className="w-5 h-5" />;
      case 'flower':
        return <Sparkles className="w-5 h-5" />;
      case 'laugh':
        return <Flame className="w-5 h-5" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5" />;
      case 'pizza':
        return <Pizza className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5 fill-rose-400" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <section id="awards" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide mb-3">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Annual Honors Ceremony</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Official Girlfriend Awards 🏆
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto">
          The competition was tough, but you wiped out the entire leaderboard.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {awards.map((award) => {
          const isClaimed = !!claimedAwards[award.id];

          return (
            <div
              key={award.id}
              onClick={() => handleClaim(award.id)}
              className={`group relative p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] ${
                isClaimed
                  ? 'border-amber-400/60 bg-gradient-to-b from-amber-950/30 to-purple-950/40 shadow-xl shadow-amber-950/40'
                  : ''
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/80">
                  {award.badge}
                </span>
                <div className={`p-2.5 rounded-2xl bg-white/5 border ${award.accent}`}>
                  {getAwardIcon(award.icon)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif-display font-semibold text-rose-100 group-hover:text-amber-200 transition-colors">
                {award.title}
              </h3>

              {/* Quote */}
              <p className="mt-2 text-xs sm:text-sm text-rose-200/75 leading-relaxed font-light italic">
                "{award.quote}"
              </p>

              {/* Acceptance Interactive Button */}
              <div className="mt-5 pt-3 border-t border-rose-500/10 flex items-center justify-between">
                <span className="text-[11px] text-rose-300/80">
                  {isClaimed ? 'Award Accepted 🏆' : 'Tap to accept award'}
                </span>
                {isClaimed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
