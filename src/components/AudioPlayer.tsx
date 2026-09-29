import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const songTitle = 'Maru Varthai Pesathey';

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing, blocked) => {
      setIsPlaying(playing);
      if (blocked && !playing) {
        setShowNotification(true);
      } else if (playing) {
        setShowNotification(false);
      }
    });

    // Global listener on first user interaction anywhere
    const handleFirstInteraction = () => {
      if (!audioManager.getStatus().isPlaying) {
        audioManager.play();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggle();
    setShowNotification(false);
  };

  return (
    <>
      {/* Minimal autoplay reminder if blocked by browser policy */}
      {showNotification && (
        <div
          onClick={handleToggle}
          className="fixed left-1/2 -translate-x-1/2 z-50 cursor-pointer animate-bounce max-w-[90vw] px-3 mobile-safe-top"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-glow text-white text-xs sm:text-sm font-medium tracking-wide border border-rose-400/40 shadow-xl shadow-rose-950/60">
            <Music className="w-3.5 h-3.5 text-rose-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Tap to play our song 🎵</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>
        </div>
      )}

      {/* Minimal, elegant floating glass button/player (bottom right) */}
      <div
        className="fixed z-40"
        style={{
          right: 'max(12px, env(safe-area-inset-right))',
          bottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={handleToggle}
          className="group relative flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-full glass-panel-glow border border-rose-500/30 text-rose-100 hover:border-rose-400/60 hover:shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause music' : `Play: ${songTitle}`}
        >
          {/* Glowing pulse ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-rose-500/30 via-pink-500/20 to-purple-500/30 blur-sm animate-pulse -z-10" />
          )}

          {/* Icon Circle */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-900/60">
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-80" />
            )}
          </div>

          {/* Minimal song label (visible on desktop or hovered) */}
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-[11px] font-semibold text-rose-200 truncate max-w-[130px] leading-tight">
              {songTitle}
            </span>
            <span className="text-[9px] text-rose-300/70 tracking-wider uppercase font-mono">
              {isPlaying ? 'Playing ❤️' : 'Paused'}
            </span>
          </div>

          {/* Mini waveform bars */}
          {isPlaying && (
            <div className="flex items-end gap-[2px] h-3 px-0.5">
              <span className="w-[2.5px] bg-rose-400 rounded-full animate-pulse h-2"></span>
              <span className="w-[2.5px] bg-rose-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-[2.5px] bg-rose-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
        </button>
      </div>
    </>
  );
};
