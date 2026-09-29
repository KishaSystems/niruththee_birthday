import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface QuickNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const QuickNav: React.FC<QuickNavProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'reasons', label: '3 Reasons' },
    { id: 'memories', label: 'Photos' },
    { id: 'story', label: 'Our Story' },
    { id: 'awards', label: 'Awards' },
    { id: 'letter', label: 'Letter' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'gift', label: 'Gift' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08030d]/85 backdrop-blur-md border-b border-rose-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Zone: Single wordmark in display face */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 group focus:outline-none cursor-pointer"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500/40 group-hover:scale-125 transition-transform" />
          <span className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-rose-100 group-hover:text-rose-200 transition-colors">
            Niruththee & Kishalan
          </span>
        </button>

        {/* Clean nav links for desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-rose-200/70">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`hover:text-rose-100 transition-colors cursor-pointer py-1 relative ${
                activeSection === item.id ? 'text-rose-200 font-semibold' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Heart indicator */}
        <div className="md:hidden flex items-center gap-1.5 text-xs text-rose-300 font-serif-display">
          <span>Happy Birthday</span>
          <span className="text-rose-400">❤️🎂</span>
        </div>
      </div>
    </header>
  );
};
