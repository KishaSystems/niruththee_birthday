import React from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';

export const SpecialMessageSection: React.FC = () => {
  const lines = [
    { text: 'Some people become memories.', highlight: false, delay: '0s' },
    { text: 'Some become stories.', highlight: false, delay: '0.15s' },
    { text: 'And somehow, you became a little part of my everyday thoughts.', highlight: true, delay: '0.3s' },
    { text: '', isSpacer: true },
    { text: 'I may not always say everything perfectly,', highlight: false, delay: '0.45s' },
    { text: 'but I hope this little website tells you something simple...', highlight: false, delay: '0.6s' },
    { text: '', isSpacer: true },
    { text: 'You are special to me.', highlight: true, isCallout: true, delay: '0.75s' },
    { text: '', isSpacer: true },
    { text: 'Happy Birthday, Niruthee. ❤️', highlight: true, isFinale: true, delay: '0.9s' },
  ];

  return (
    <section id="special-message" className="relative min-h-[85vh] flex flex-col items-center justify-center py-24 sm:py-32 px-4 sm:px-6 z-10 text-center">
      {/* Cinematic ambient background glow & nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-tr from-purple-950/25 via-rose-900/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-3xl w-full mx-auto">
        {/* Decorative Quote Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 mb-6 shadow-xl shadow-rose-950/80 animate-float-gentle">
          <Quote className="w-5 h-5 fill-rose-400/30 text-rose-400" />
        </div>

        {/* Section Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>A Special Message</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-rose-50 text-glow mb-12 sm:mb-16">
          For You, Niruthee ❤️
        </h2>

        {/* Cinematic Card Container */}
        <div className="relative p-8 sm:p-14 rounded-3xl glass-panel-glow border border-rose-400/30 shadow-2xl shadow-rose-950/90 text-center">
          <div className="space-y-3 sm:space-y-4">
            {lines.map((line, index) => {
              if (line.isSpacer) {
                return <div key={index} className="h-4 sm:h-6" />;
              }

              if (line.isFinale) {
                return (
                  <p
                    key={index}
                    className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent text-glow pt-4 tracking-wide"
                  >
                    {line.text}
                  </p>
                );
              }

              if (line.isCallout) {
                return (
                  <p
                    key={index}
                    className="font-serif-display text-xl sm:text-2xl md:text-3xl font-semibold text-rose-100 text-glow py-1 tracking-wide"
                  >
                    {line.text}
                  </p>
                );
              }

              return (
                <p
                  key={index}
                  className={`text-base sm:text-lg md:text-xl font-light leading-relaxed font-serif-display ${
                    line.highlight
                      ? 'text-rose-100 font-normal text-glow-soft'
                      : 'text-rose-200/80'
                  }`}
                >
                  {line.text}
                </p>
              );
            })}
          </div>

          {/* Bottom subtle heart indicator */}
          <div className="mt-10 pt-6 border-t border-rose-500/20 flex items-center justify-center gap-2 text-rose-400/50 text-xs tracking-wider font-light">
            <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-400" />
            <span>Always in my thoughts</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
