'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'New Arrivals', href: '/new', badge: 'Live' },
    { name: 'Editorials', href: '/editorials' },
    { name: 'Archive', href: '/archive' },
    { name: 'Atelier', href: '/atelier' },
    { name: 'Sustainability', href: '/sustainability', icon: '🌱' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A1A2E]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        
        {/* Logo (Left) */}
        <a href="/" className="text-2xl font-[Playfair_Display] text-[#F8F7F4] tracking-wider hover:opacity-70 transition-opacity">
          NOCTIS
        </a>

        {/* Desktop Categories (Center) */}
        <ul className="hidden lg:flex items-center gap-10">
          {categories.map((cat) => (
            <li key={cat.name} className="relative group">
              
                href={cat.href}
                className="text-sm text-[#F8F7F4]/80 hover:text-[#F8F7F4] tracking-widest uppercase flex items-center gap-2 transition-colors"
              >
                {cat.name}
                {cat.icon && <span>{cat.icon}</span>}
                {cat.badge && (
                  <span className="px-2 py-0.5 bg-[#C7522A] text-[8px] text-white rounded-full animate-pulse">
                    {cat.badge}
                  </span>
                )}
              </a>
              {/* Underline effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <button
            className="text-[#F8F7F4] hover:text-[#D4AF37] transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Account */}
          <button
            className="text-[#F8F7F4] hover:text-[#D4AF37] transition-colors"
            aria-label="Account"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Cart with Micro-Interaction */}
          <button
            className="relative text-[#F8F7F4] hover:text-[#D4AF37] transition-colors group"
            aria-label="Shopping cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-[#C7522A] text-white text-[10px] font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#F8F7F4]"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0A0A0A] lg:hidden p-12 flex flex-col justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 text-[#F8F7F4] text-3xl"
            >
              ×
            </button>
            
            <ul className="space-y-8">
              {categories.map((cat, i) => (
                <motion.li
                  key={cat.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  
                    href={cat.href}
                    className="text-4xl font-[Playfair_Display] text-[#F8F7F4] hover:text-[#D4AF37] transition-colors"
                  >
                    {cat.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
