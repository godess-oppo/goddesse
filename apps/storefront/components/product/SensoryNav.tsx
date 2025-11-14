'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSensoryAudio } from '@/hooks/useSensoryAudio';

export default function SensoryNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playSound } = useSensoryAudio();

  const handleNavInteraction = () => {
    playSound(320, 'sine', 500);
  };

  const navItems = [
    { name: 'Shop', href: '/shop', emoji: '🛍️' },
    { name: 'Sensory', href: '/sensory', emoji: '🌈' },
    { name: 'About', href: '/about', emoji: '👁️' },
    { name: 'Contact', href: '/contact', emoji: '📞' }
  ];

  return (
    <nav className="glass-morphism rounded-full mx-4 mt-4 md:mx-auto md:max-w-2xl">
      <div className="flex items-center justify-between p-4">
        <Link 
          href="/" 
          className="text-2xl font-bold"
          onMouseEnter={handleNavInteraction}
        >
          <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            RESIN
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors group"
              onMouseEnter={handleNavInteraction}
            >
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {item.emoji}
              </span>
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            handleNavInteraction();
          }}
        >
          <div className="w-6 h-0.5 bg-amber-400 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-amber-400 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-amber-400"></div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-morphism rounded-2xl m-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 py-3 text-gray-300 hover:text-amber-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">{item.emoji}</span>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
