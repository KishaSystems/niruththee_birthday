import React, { useState } from 'react';
import { Heart, Smile, MessageCircle, Flame, Sparkles, Eye, ChevronDown } from 'lucide-react';

interface MemoryCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  preview: string;
  romanticMessage: string;
}

export const MemoriesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const memoryCards: MemoryCard[] = [
    {
      id: 'smile',
      title: 'Your Smile 😊',
      icon: <Smile className="w-5 h-5 text-amber-300" />,
      preview: 'The way everything gets a little brighter...',
      romanticMessage:
        'The way your eyes soften and light up whenever you smile genuinely... even on the most exhausting days, seeing you truly happy makes everything feel calm, peaceful, and right.',
    },
    {
      id: 'conversations',
      title: 'Those Random Conversations 💬',
      icon: <MessageCircle className="w-5 h-5 text-pink-400" />,
      preview: 'Talking about everything and nothing at all...',
      romanticMessage:
        'From deep late-night talks to the silly little debates only we understand. I never get tired of listening to your voice or hearing whatever thought just crossed your mind.',
    },
    {
      id: 'fights',
      title: 'The Little Fights 😤❤️',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      preview: 'When you argue like a little kid...',
      romanticMessage:
        'Even when you are being stubborn or trying to win an argument, you look adorable. Those playful little disagreements always end up making me smile anyway.',
    },
    {
      id: 'moments',
      title: 'The Moments That Made Me Smile ✨',
      icon: <Sparkles className="w-5 h-5 text-amber-300" />,
      preview: 'Little glimpses I keep in my heart...',
      romanticMessage:
        'The unexpected glances, the shared laughter over things nobody else noticed, and the quiet comfort of just knowing you are there beside me.',
    },
    {
      id: 'unsaid',
      title: 'Things I Never Said 💭',
      icon: <Eye className="w-5 h-5 text-purple-300" />,
      preview: 'What I often keep in my quiet thoughts...',
      romanticMessage:
        'I may not always say everything in the most poetic words, but I notice how kind you are, how hard you try, and how deeply I appreciate you in my life every single day.',
    },
    {
      id: 'favorite',
      title: 'My Favorite Memories 📸',
      icon: <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30" />,
      preview: 'Every little chapter we have shared so far...',
      romanticMessage:
        'Every trip, every seminar, every shared silence, and every sweet moment we have had together has become a treasured memory I will keep in my heart forever.',
    },
  ];

  const handleCardToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="memories" className="relative py-16 sm:py-28 mobile-safe-padding px-4 sm:px-6 max-w-5xl mx-auto z-10 w-full overflow-x-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span>Keepsakes</span>
        </div>
        <h2 className="font-serif-display font-bold text-rose-50 text-glow px-1 break-words [font-size:clamp(1.7rem,7vw,3.1rem)]">
          Little Things I Remember
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto font-light leading-relaxed">
          The small, everyday details and little moments that make you so special to me. Tap any card to open.
        </p>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {memoryCards.map((card) => {
          const isExpanded = expandedId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => handleCardToggle(card.id)}
              className={`group relative w-full p-5 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border select-none min-h-[44px] active:scale-[0.99] ${
                isExpanded
                  ? 'glass-panel-glow border-rose-400/50 shadow-2xl shadow-rose-950/70 scale-[1.02]'
                  : 'glass-card border-rose-500/20 hover:border-rose-400/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/50'
              }`}
            >
              {/* Top Row: Icon + Expand Indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shadow-md">
                  {card.icon}
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-rose-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 bg-rose-500/20 text-rose-200' : 'group-hover:translate-y-0.5'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-serif-display font-bold text-rose-100 group-hover:text-rose-200 transition-colors">
                {card.title}
              </h3>

              {/* Short Preview (always shown) */}
              <p className="mt-2 text-xs sm:text-sm text-rose-300/70 font-light leading-relaxed">
                {card.preview}
              </p>

              {/* Expanded Romantic Message */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-60 opacity-100 mt-4 pt-4 border-t border-rose-500/20' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-xs sm:text-sm text-rose-100/90 font-light leading-relaxed font-serif-display text-[15px] sm:text-[16px] text-glow-soft">
                  "{card.romanticMessage}"
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-rose-400/70 font-mono tracking-wider">
                  <Heart className="w-3 h-3 fill-rose-500/40" />
                  <span>Forever remembered</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
