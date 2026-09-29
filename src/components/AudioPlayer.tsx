import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Upload } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [songTitle] = useState('Maru Varthai Pesathey');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing, blocked) => {
      setIsPlaying(playing);
      setIsBlocked(blocked);
      if (blocked && !playing) {
        setShowNotification(true);
      } else if (playing) {
        setShowNotification(false);
      }
    });

    // Global listener on first user tap/click anywhere to start music if blocked
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

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      audioManager.setCustomAudio(url);
    }
  };

  return (
    <>
      {/* Autoplay blocked notification prompt */}
      {showNotification && (
        <div 
          onClick={handleToggle}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 cursor-pointer animate-bounce max-w-[90vw]"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600/90 to-purple-600/90 text-white shadow-lg shadow-rose-900/40 backdrop-blur-md border border-rose-300/30 text-xs sm:text-sm font-medium tracking-wide">
            <Music className="w-4 h-4 animate-spin text-rose-200" style={{ animationDuration: '3s' }} />
            <span>🎵 Tap to play our song ❤️</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>
      )}

      {/* Floating Bottom Music Bar (Compact & Ergonomic, Mobile Safe) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleCustomAudioUpload}
        />

        <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel-glow text-rose-100 shadow-xl border border-rose-500/20 backdrop-blur-xl">
          {/* Animated soundbars when playing */}
          <button
            onClick={handleToggle}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-full"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={isPlaying ? 'Pause music' : 'Play song: Maru Varthai Pesathey'}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-900/50">
              {isPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-80" />
              )}
            </div>

            <div className="hidden sm:flex flex-col text-left pr-1 max-w-[130px]">
              <span className="text-[11px] font-semibold text-rose-200 truncate leading-tight">
                {songTitle}
              </span>
              <span className="text-[9px] text-rose-300/70 tracking-wider uppercase">
                {isPlaying ? 'Playing for Niruththee' : 'Paused'}
              </span>
            </div>

            {isPlaying && (
              <div className="flex items-end gap-[3px] h-3 px-1">
                <span className="w-[3px] bg-rose-400 rounded-full animate-pulse h-2"></span>
                <span className="w-[3px] bg-rose-400 rounded-full animate-pulse h-3" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-[3px] bg-rose-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }}></span>
              </div>
            )}
          </button>

          {/* Optional music upload trigger if user wants to supply mp3 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-rose-300/60 hover:text-rose-200 hover:bg-rose-500/20 transition-colors"
            title="Upload/Select audio file if needed"
            aria-label="Upload audio file"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
