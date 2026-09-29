// Audio Controller for Niruththee's Birthday Website
// Handles /assets/Maru-Varthai-Pesathey.mp3 with autoplay block detection,
// Web Audio fallback for romantic melodies, and seamless loop controls.

class BirthdayAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isAutoplayBlocked: boolean = false;
  private listeners: Set<(playing: boolean, blocked: boolean) => void> = new Set();
  private audioContext: AudioContext | null = null;
  private synthInterval: number | null = null;
  private synthGain: GainNode | null = null;
  private usingSynthFallback: boolean = false;
  private customAudioSrc: string | null = null;

  constructor() {
    this.initAudio();
  }

  private initAudio() {
    if (typeof window === 'undefined') return;

    // Primary relative path as requested: /assets/Maru-Varthai-Pesathey.mp3
    const audioPath = this.customAudioSrc || '/assets/Maru-Varthai-Pesathey.mp3';
    
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(audioPath);
    this.audio.loop = true;
    this.audio.volume = 0.65;
    this.audio.preload = 'auto';

    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.isAutoplayBlocked = false;
      this.stopSynth();
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('error', () => {
      // If the mp3 file is not found yet, enable synthetic soft romantic chords
      console.log('Audio file not found yet at /assets/Maru-Varthai-Pesathey.mp3, ready for fallback or upload.');
      if (this.isPlaying) {
        this.playGentleSynthMelody();
      }
    });
  }

  public setCustomAudio(url: string) {
    this.customAudioSrc = url;
    this.initAudio();
    this.play();
  }

  public subscribe(cb: (playing: boolean, blocked: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying, this.isAutoplayBlocked);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying, this.isAutoplayBlocked));
  }

  public async attemptAutoplay(): Promise<boolean> {
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.isAutoplayBlocked = false;
      this.notify();
      return true;
    } catch {
      // Autoplay blocked by browser policy
      this.isAutoplayBlocked = true;
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public play() {
    if (!this.audio) return;
    this.isAutoplayBlocked = false;
    
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.stopSynth();
          this.notify();
        })
        .catch(() => {
          // If HTML audio failed to play, fall back to soft romantic synth
          this.playGentleSynthMelody();
        });
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isAutoplayBlocked: this.isAutoplayBlocked,
      usingFallback: this.usingSynthFallback,
    };
  }

  // Gentle acoustic acoustic-piano style harmonic arpeggio (Web Audio API)
  private playGentleSynthMelody() {
    if (this.usingSynthFallback) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.usingSynthFallback = true;
      this.isPlaying = true;
      this.notify();

      // Pentatonic romantic notes (C4, E4, G4, A4, B4, C5, D5, E5)
      const freqs = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
      let step = 0;

      const playTone = () => {
        if (!this.usingSynthFallback || !this.audioContext) return;
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        // Warm sine wave with gentle attack & decay
        osc.type = 'sine';
        const freq = freqs[step % freqs.length];
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 2.0);

        step = (step + 1) % freqs.length;
      };

      playTone();
      this.synthInterval = window.setInterval(playTone, 650);
    } catch (e) {
      console.warn('Audio fallback note:', e);
    }
  }

  private stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.usingSynthFallback = false;
  }
}

export const audioManager = new BirthdayAudioManager();
