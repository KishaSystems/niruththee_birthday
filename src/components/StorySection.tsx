import React, { useEffect, useRef } from 'react';
import { Heart, Sparkles, MessageCircle, Bus } from 'lucide-react';

interface JourneyChapter {
  id: string;
  badge: string;
  chapterNumber: string;
  title: string;
  description: string;
  icon: 'heart' | 'message' | 'bus' | 'sparkles';
}

export const StorySection: React.FC = () => {
  const chapters: JourneyChapter[] = [
    {
      id: 'chapter-1',
      badge: 'Chapter 01',
      chapterNumber: '01',
      title: 'The First Time I Saw You ❤️',
      description:
        'That first moment at Puthukkudiyiruppu Central College during the Dreamway meeting... you were there arguing like a little kid, and somehow, that was the moment I noticed you.',
      icon: 'heart',
    },
    {
      id: 'chapter-2',
      badge: 'Chapter 02',
      chapterNumber: '02',
      title: 'Our First Conversation 💬',
      description:
        'At Vidhtyanatha School during the Chemistry seminar... you came and did the practical, and somehow that simple moment became one of the memories I still remember.',
      icon: 'message',
    },
    {
      id: 'chapter-3',
      badge: 'Chapter 03',
      chapterNumber: '03',
      title: 'The Journey Back Together 🚌',
      description:
        'Sitting side by side on that bus ride after the seminar... sharing that quiet, simple moment that somehow felt so special. Being beside you made an ordinary bus ride unforgettable.',
      icon: 'bus',
    },
    {
      id: 'chapter-4',
      badge: 'Chapter 04',
      chapterNumber: '04',
      title: 'Every Day Since Then ✨',
      description:
        'From those quiet beginnings to where we are now, every little step has made you more special to me. Today, and every day, I am grateful for you.',
      icon: 'sparkles',
    },
  ];

  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const cards = root.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    cards.forEach((card) => observer.observe(card));
    const fallback = window.setTimeout(() => {
      cards.forEach((card) => card.classList.add('is-visible'));
    }, 1800);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const renderIcon = (type: JourneyChapter['icon']) => {
    switch (type) {
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-400 fill-rose-500/40" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-pink-400" />;
      case 'bus':
        return <Bus className="w-5 h-5 text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section id="journey" className="relative py-14 sm:py-24 md:py-28 mobile-safe-padding px-4 sm:px-6 max-w-4xl mx-auto z-10 w-full overflow-x-hidden">
      {/* Subtle ambient glow behind timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[350px] sm:h-[700px] bg-purple-900/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-18 md:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-wider uppercase mb-3">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-500/30" />
          <span>Our Story</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-500/30" />
        </div>
        <h2 className="text-[clamp(1.8rem,7vw,3.2rem)] font-serif-display font-bold text-rose-50 text-glow">
          Our Little Journey
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto font-light leading-relaxed">
          The quiet, beautiful moments where it all began.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Glowing timeline spine: left-aligned on mobile, centered on desktop */}
        <div className="absolute top-4 bottom-8 left-5 sm:left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/80 via-purple-500/50 to-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.6)]" />

        <div className="space-y-8 sm:space-y-12">
          {chapters.map((ch, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={ch.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Glowing Heart Timeline Marker */}
                <div className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#12051c] border-2 border-rose-400/90 shadow-[0_0_18px_rgba(244,63,94,0.6)]">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 fill-rose-500 animate-pulse-slow" />
                </div>

                {/* Glassmorphic Story Card */}
                <div className="ml-12 sm:ml-14 md:ml-0 md:w-[45%] w-[calc(100%-3.25rem)] sm:w-[calc(100%-3.5rem)] max-w-full">
                  <div className="scroll-reveal group relative p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl glass-card border border-rose-500/20 hover:border-rose-400/40 hover:shadow-2xl hover:shadow-rose-950/60 transition-all duration-300">
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-rose-300/80 tracking-widest uppercase font-mono">
                        {ch.badge}
                      </span>
                      <span className="text-[11px] text-rose-400/40 font-mono">
                        {ch.chapterNumber}
                      </span>
                    </div>

                    {/* Chapter Title */}
                    <h3 className="text-base sm:text-xl font-serif-display font-bold text-rose-100 group-hover:text-rose-200 transition-colors leading-snug">
                      {ch.title}
                    </h3>

                    {/* Chapter Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light break-words">
                      {ch.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
