import React, { useState, useEffect, useRef } from 'react';

interface NotificationConfig {
  id: string;
  message: string;
}

export const ScrollNotifications: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const seenSectionsRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  const notifications: NotificationConfig[] = [
    {
      id: 'journey',
      message: "💌 Wait... there's something I want you to remember.",
    },
    {
      id: 'memories',
      message: '❤️ Some moments are small, but they stay forever.',
    },
    {
      id: 'gallery',
      message: '📸 A few memories worth keeping.',
    },
    {
      id: 'letter',
      message: '💌 I wrote something just for you.',
    },
    {
      id: 'quiz',
      message: '✨ Let’s see how well you remember us...',
    },
    {
      id: 'impossible-button',
      message: '🎮 Okay... now let’s see how well you know us 😏',
    },
    {
      id: 'birthday-moment',
      message: '🎂 Happy Birthday, Niruthee ❤️',
    },
    {
      id: 'final',
      message: '❤️ You made it this far...',
    },
  ];

  const showNotification = (msg: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentMessage(msg);
    setIsVisible(true);

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setCurrentMessage(null), 400);
    }, 3800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (!seenSectionsRef.current.has(sectionId)) {
              seenSectionsRef.current.add(sectionId);
              const config = notifications.find((n) => n.id === sectionId);
              if (config) {
                showNotification(config.message);
              }
            }
          }
        });
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: 0.15,
      }
    );

    notifications.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!currentMessage) return null;

  const isProtectedSection =
    currentMessage.includes('I wrote something') ||
    currentMessage.includes('how well you know us');

  return (
    <div
      className={`fixed inset-x-0 mx-auto z-30 pointer-events-none px-3 transition-all duration-500 ease-out w-[min(90vw,24rem)] ${
        isProtectedSection ? 'scroll-toast-safe' : 'scroll-toast'
      }`}
    >
      <div
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl glass-panel-glow border border-rose-400/40 text-rose-50 text-xs sm:text-sm font-medium tracking-wide shadow-2xl shadow-rose-950/80 transition-all duration-500 ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-3 scale-95'
        }`}
      >
        <span className="leading-snug text-glow-soft text-center break-words">{currentMessage}</span>
      </div>
    </div>
  );
};
