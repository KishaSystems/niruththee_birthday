import React, { useState, useEffect, useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';
import { MemoryPhoto } from '../types';

export const MemoriesSection: React.FC = () => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load photos from public/assets folder
  useEffect(() => {
    const loadedPhotos: MemoryPhoto[] = [];

    // Known image files in public/assets/ — served at /assets/ by Vite
    const assetImages = [
      'WhatsApp Image 2026-09-28 at 23.45.33.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.40 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.40.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.41.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.42 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.42.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.43 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.43.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.44.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.45 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.45 (2).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.45.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.46 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.46.jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.47 (1).jpeg',
      'WhatsApp Image 2026-09-28 at 23.51.47.jpeg',
      'WhatsApp Image 2026-09-29 at 15.42.15.jpeg',
      'WhatsApp Image 2026-09-29 at 15.42.16.jpeg',
    ];

    assetImages.forEach((filename, idx) => {
      loadedPhotos.push({
        id: `asset-${idx}`,
        src: `/assets/${encodeURIComponent(filename)}`,
        caption: `Memory #${idx + 1} ❤️`,
        source: 'assets',
      });
    });

    // Also load any locally uploaded user photos from localStorage for instant phone testing
    try {
      const stored = localStorage.getItem('niruththee_kishalan_photos');
      if (stored) {
        const parsed = JSON.parse(stored) as MemoryPhoto[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedPhotos.push(...parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }

    setPhotos(loadedPhotos);
  }, []);

  // Keyboard navigation (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const showNext = () => {
    if (lightboxIndex === null || photos.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  const showPrev = () => {
    if (lightboxIndex === null || photos.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  // Touch Swipe Handlers for mobile lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        showPrev();
      } else {
        showNext();
      }
    }
    touchStartXRef.current = null;
  };

  // Allow uploading real photos directly on phone/browser to save into memories
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: MemoryPhoto[] = [];
    const count = files.length;
    let loaded = 0;

    Array.from(files).forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push({
            id: `uploaded-${Date.now()}-${i}`,
            src: event.target.result as string,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            source: 'uploaded',
          });
        }
        loaded++;
        if (loaded === count) {
          const updated = [...photos, ...newPhotos];
          setPhotos(updated);
          try {
            // Save only first 15 uploaded photos to stay within localStorage limits
            localStorage.setItem('niruththee_kishalan_photos', JSON.stringify(updated.filter(p => p.source === 'uploaded').slice(0, 15)));
          } catch {
            // Quota exceeded
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section id="memories" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-wide mb-3">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Photo Gallery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-rose-50 text-glow">
          Evidence That We Actually Have Fun Together 📸
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto">
          Every picture with you is my favorite picture.
        </p>

        {/* Upload real memories button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-rose-400/50 text-xs font-medium text-rose-200 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            <span>Add Our Real Photos 📸</span>
          </button>
        </div>
      </div>

      {/* Gallery display */}
      {photos.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative break-inside-avoid rounded-2xl sm:rounded-3xl overflow-hidden glass-card p-1.5 sm:p-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-950/60 hover:border-rose-400/50"
            >
              <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/40">
                <img
                  src={photo.src}
                  alt={photo.caption || 'Niruththee & Kishalan memory'}
                  loading="lazy"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs sm:text-sm font-medium text-rose-100 text-glow">
                    {photo.caption || 'Tap to view ❤️'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Friendly empty state adhering to "DO NOT use fake / stock photos" rule */
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-dashed border-rose-500/30 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-serif-display font-semibold text-rose-100">
            Ready for our real photos ❤️
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-rose-200/70 leading-relaxed">
            Drop your photos into the project's <code className="px-1.5 py-0.5 rounded bg-black/40 text-rose-300">/assets</code> folder or tap below to upload them directly from your phone or laptop!
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-medium shadow-lg shadow-rose-950 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Select Photos of Us 📸</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      )}

      {/* Full-Screen Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn select-none"
        >
          {/* Top Bar with Counter and Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between z-10 pt-2"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-medium text-rose-100">
              {lightboxIndex + 1} / {photos.length}
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-4xl flex items-center justify-center my-3 overflow-hidden"
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].caption || 'Enlarged photo'}
              className="max-h-[75vh] max-w-full w-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-rose-500/20"
            />
          </div>

          {/* Bottom Bar: Prev / Caption / Next */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg flex items-center justify-between gap-4 pb-2"
          >
            <button
              onClick={showPrev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <span className="text-xs sm:text-sm text-rose-200/90 text-center truncate max-w-[200px]">
              {photos[lightboxIndex].caption || 'Swipe left/right on mobile'}
            </span>

            <button
              onClick={showNext}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
