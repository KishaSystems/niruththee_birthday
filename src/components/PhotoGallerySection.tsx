import React, { useState, useEffect, useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Heart, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  rotation: number;
}

export const PhotoGallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Exact files from public/assets/
  const photos: GalleryPhoto[] = [
    {
      id: 'photo-1',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.45.33.jpeg')}`,
      caption: 'That sweet, unmistakable smile ✨',
      rotation: -2,
    },
    {
      id: 'photo-2',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.40 (1).jpeg')}`,
      caption: 'A candid moment worth keeping forever ❤️',
      rotation: 1.8,
    },
    {
      id: 'photo-3',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.40.jpeg')}`,
      caption: 'Just being yourself, effortlessly 🌸',
      rotation: -1.2,
    },
    {
      id: 'photo-4',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.41.jpeg')}`,
      caption: 'A quiet little glimpse of you 🕊️',
      rotation: 2.2,
    },
    {
      id: 'photo-5',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.42 (1).jpeg')}`,
      caption: 'Memories we will never forget 💫',
      rotation: -1.8,
    },
    {
      id: 'photo-6',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.42.jpeg')}`,
      caption: 'Every picture tells our story 📷',
      rotation: 1.5,
    },
    {
      id: 'photo-7',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.43 (1).jpeg')}`,
      caption: 'That gentle, beautiful look ✨',
      rotation: -2.2,
    },
    {
      id: 'photo-8',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.43.jpeg')}`,
      caption: 'My favorite person in the frame ❤️',
      rotation: 2,
    },
    {
      id: 'photo-9',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.44.jpeg')}`,
      caption: 'Treasured little days 🌅',
      rotation: -1.5,
    },
    {
      id: 'photo-10',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.45 (1).jpeg')}`,
      caption: 'Laughter that makes everything lighter 🌸',
      rotation: 1.9,
    },
    {
      id: 'photo-11',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.45 (2).jpeg')}`,
      caption: 'One of my absolute favorites 💫',
      rotation: -2.4,
    },
    {
      id: 'photo-12',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.45.jpeg')}`,
      caption: 'Simple moments, deepest feelings ❤️',
      rotation: 1.3,
    },
    {
      id: 'photo-13',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.46 (1).jpeg')}`,
      caption: 'Every moment with you is a gift ✨',
      rotation: -1.7,
    },
    {
      id: 'photo-14',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.46.jpeg')}`,
      caption: 'Quiet happiness 🕊️',
      rotation: 2.1,
    },
    {
      id: 'photo-15',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.47 (1).jpeg')}`,
      caption: 'That irreplaceable spark in your eyes 💖',
      rotation: -1.4,
    },
    {
      id: 'photo-16',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-28 at 23.51.47.jpeg')}`,
      caption: 'Always holding this close to my heart 🌹',
      rotation: 1.6,
    },
    {
      id: 'photo-17',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-29 at 15.42.15.jpeg')}`,
      caption: 'Looking back at the path we walked together 🛤️',
      rotation: -2.1,
    },
    {
      id: 'photo-18',
      src: `/assets/${encodeURIComponent('WhatsApp Image 2026-09-29 at 15.42.16.jpeg')}`,
      caption: 'Today, tomorrow, and always ❤️',
      rotation: 1.7,
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) showPrev();
      else showNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-28 mobile-safe-padding px-4 sm:px-6 max-w-6xl mx-auto z-10 w-full overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-rose-950/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-medium tracking-widest uppercase mb-3">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Captured Moments</span>
        </div>
        <h2 className="font-serif-display font-bold text-rose-50 text-glow px-1 break-words [font-size:clamp(1.7rem,7vw,3.1rem)]">
          Our Memory Gallery
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto font-light leading-relaxed">
          Snapshots of our journey. Tap any polaroid to view it in full.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-4 min-[375px]:gap-3 sm:gap-8">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setLightboxIndex(index)}
            style={{
              transform: `rotate(${photo.rotation}deg)`,
            }}
            className="polaroid-card group relative w-full p-2.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 min-h-[44px]"
          >
            {/* Image Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/60 shadow-inner">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="gallery-hover-hint absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs text-rose-100 font-medium text-glow-soft">
                  Tap to view full photo ❤️
                </span>
              </div>
            </div>

            {/* Polaroid Bottom Caption Area */}
            <div className="pt-3 pb-1 px-1 text-center">
              <p className="font-handwriting text-lg sm:text-xl text-rose-100 group-hover:text-rose-300 transition-colors tracking-wide leading-tight">
                {photo.caption}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-rose-400/50 font-mono">
                <Heart className="w-2.5 h-2.5 fill-rose-500/30" />
                <span>Memory #{index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-[#05010a]/95 backdrop-blur-xl flex flex-col items-center justify-between animate-fadeIn select-none"
          style={{
            paddingTop: 'max(12px, env(safe-area-inset-top))',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            paddingLeft: 'max(12px, env(safe-area-inset-left))',
            paddingRight: 'max(12px, env(safe-area-inset-right))',
          }}
        >
          {/* Top Bar: Counter & Close */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl flex items-center justify-between pt-2 z-10"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-mono text-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {lightboxIndex + 1} / {photos.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full glass-pill hover:bg-rose-500/20 active:scale-95 text-rose-200 hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-rose-500/30"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-4xl flex items-center justify-center my-3 overflow-hidden"
          >
            <div className="relative max-h-[68dvh] sm:max-h-[75vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-rose-500/30 bg-black/40 p-1.5 sm:p-2 glass-panel">
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].caption}
                className="max-h-[64dvh] sm:max-h-[70vh] max-w-[min(100%,92vw)] w-auto object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Bottom Bar: Prev / Caption / Next */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl flex items-center justify-between gap-2 sm:gap-4 pb-1"
          >
            <button
              onClick={showPrev}
              className="p-3 rounded-full glass-pill hover:bg-rose-500/20 text-rose-200 active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-rose-500/30"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center px-1 min-w-0 flex-1">
              <p className="font-handwriting text-base sm:text-2xl text-rose-100 text-glow-soft leading-snug break-words">
                {photos[lightboxIndex].caption}
              </p>
              <span className="text-[10px] text-rose-400/60 font-mono tracking-wider">
                Swipe left or right on mobile
              </span>
            </div>

            <button
              onClick={showNext}
              className="p-3 rounded-full glass-pill hover:bg-rose-500/20 text-rose-200 active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-rose-500/30"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
