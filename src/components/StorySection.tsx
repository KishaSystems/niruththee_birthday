import React from 'react';
import { Heart, Sparkles, MessageCircle, Bus, Clock, Cake } from 'lucide-react';
import { StoryChapter } from '../types';

export const StorySection: React.FC = () => {
  const chapters: StoryChapter[] = [
    {
      id: 'chapter-1',
      badge: 'Chapter 1 ✨',
      chapterNumber: '01',
      title: 'Our First Meeting',
      content:
        'I still remember the first time I saw you at Puthukkudiyiruppu Central College, when you came for the Dreamway meeting. You were there, arguing like a little kid, and somehow, in that moment, you caught my attention. I never knew that the person I was seeing for the first time that day would one day become so special to me. ❤️',
      icon: 'sparkles',
    },
    {
      id: 'chapter-2',
      badge: 'Chapter 2 💬',
      chapterNumber: '02',
      title: 'Our First Conversation',
      content:
        'Our first conversation happened when you came to Vidthyanatha School for the Chemistry seminar. I had put so much effort into preparing the practical, but you simply took it and did it yourself. 😂 At the time, it was just a small moment, but little did I know that it would become the beginning of something so beautiful between us. 🥹❤️',
      icon: 'message',
    },
    {
      id: 'chapter-3',
      badge: 'Chapter 3 🥹',
      chapterNumber: '03',
      title: 'Our First Special Memory',
      content:
        'One of my most precious memories is the journey back from the seminar. You and I sat side by side on the same bus seat, close to each other, sharing a simple little moment that somehow felt so special. 😌❤️\n\nIt wasn\'t anything grand, but being beside you made that ordinary bus ride feel like a memory I would want to keep forever. ✨',
      icon: 'bus',
    },
    {
      id: 'chapter-4',
      badge: 'Chapter 4 ❤️',
      chapterNumber: '04',
      title: 'Somewhere Along the Way',
      content:
        'Oops. I fell in love. Still processing that information, honestly. ❤️',
      icon: 'heart',
    },
    {
      id: 'today',
      badge: 'Today 🎂',
      chapterNumber: '05',
      title: 'Right Here, Right Now',
      content:
        'Still here. Still yours. Still annoying you on purpose. And absolutely not sorry about it. 😌',
      icon: 'cake',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-pink-400" />;
      case 'bus':
        return <Bus className="w-5 h-5 text-purple-400" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500/30" />;
      case 'cake':
        return <Cake className="w-5 h-5 text-amber-400" />;
      default:
        return <Clock className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="story" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-wide mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
          <span>Our Journey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Our Story ❤️
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/70 max-w-sm mx-auto">
          From that first meeting to celebrating your birthday today.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Glowing center spine (left-aligned on mobile, center on md+) */}
        <div className="absolute top-2 bottom-6 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/60 via-purple-500/50 to-pink-500/20 shadow-[0_0_12px_rgba(244,63,94,0.4)]" />

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
                {/* Timeline Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-[#12071f] border-2 border-rose-400 shadow-lg shadow-rose-950/80">
                  {getIcon(ch.icon)}
                </div>

                {/* Content Card (mobile: offset from left node; desktop: 45% width) */}
                <div
                  className={`ml-14 md:ml-0 md:w-[45%] w-[calc(100%-4rem)]`}
                >
                  <div className="group relative p-5 sm:p-7 rounded-3xl glass-card border border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/50">
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-rose-300 tracking-wider">
                        {ch.badge}
                      </span>
                      <span className="text-[11px] font-mono text-rose-400/50">
                        {ch.chapterNumber}
                      </span>
                    </div>

                    {/* Chapter Title */}
                    <h3 className="text-lg sm:text-xl font-serif-display font-semibold text-rose-100 group-hover:text-rose-200 transition-colors">
                      {ch.title}
                    </h3>

                    {/* Chapter Prose (preserving exact wording & newlines) */}
                    <p className="mt-3 text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light whitespace-pre-line">
                      {ch.content}
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
