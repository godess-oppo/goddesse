'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConversionLayer = () => {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState<string[]>([
    'Maria in Berlin just purchased Silk Blazer',
    'James in Tokyo added Archive Coat to cart',
    'Sophie in Paris purchased Linen Trousers',
  ]);
  const [currentPurchase, setCurrentPurchase] = useState(0);

  // Email popup trigger (after 15s or exit intent)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('email_captured')) {
        setShowEmailPopup(true);
      }
    }, 15000);

    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('email_captured')) {
        setShowEmailPopup(true);
      }
    };

    document.addEventListener('mouseout', handleExitIntent);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleExitIntent);
    };
  }, []);

  // Rotate recent purchases ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPurchase((prev) => (prev + 1) % recentPurchases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [recentPurchases]);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('email_captured', 'true');
    setShowEmailPopup(false);
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_capture', {
        event_category: 'conversion',
        event_label: 'newsletter_signup',
      });
    }
  };

  return (
    <>
      {/* Trust Signals Bar (Fixed Bottom) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-lg border-t border-white/10 py-4 px-6 z-40 hidden lg:block"
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between text-[#F8F7F4]/80 text-xs">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#7A9B76]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="tracking-wide">Free Carbon-Neutral Shipping</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#7A9B76]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="tracking-wide">60-Day Returns + Lifetime Repairs</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#7A9B76]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="tracking-wide">Secure Checkout · SSL Encrypted</span>
          </div>
        </div>
      </motion.div>

      {/* Social Proof Ticker (Left Side) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPurchase}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed left-6 bottom-24 lg:bottom-6 bg-white rounded-lg shadow-2xl p-4 max-w-xs z-40"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C7522A] rounded-full flex items-center justify-center text-white font-bold text-xs">
              🛍️
            </div>
            <div className="flex-1">
              <p className="text-[#0A0A0A] text-sm font-medium leading-tight">
                {recentPurchases[currentPurchase]}
              </p>
              <p className="text-[#6B6B6B] text-xs mt-1 font-[JetBrains_Mono]">
                {Math.floor(Math.random() * 30) + 1}m ago
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Email Capture Popup (Non-Intrusive) */}
      <AnimatePresence>
        {showEmailPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6"
            onClick={() => setShowEmailPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F8F7F4] rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/email-popup-visual.webp"
                    alt="Exclusive preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                </div>

                {/* Right: Form */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <button
                    onClick={() => setShowEmailPopup(false)}
                    className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h3 className="font-[Playfair_Display] text-3xl text-[#0A0A0A] mb-3">
                    Join the Nocturnal Circle
                  </h3>
                  <p className="text-[#6B6B6B] text-sm mb-6 leading-relaxed">
                    Early access to collections, behind-the-scenes stories, and <strong>10% off your first order</strong>.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border-2 border-[#E0E0E0] focus:border-[#0A0A0A] outline-none transition-colors text-sm"
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-[#0A0A0A] text-[#F8F7F4] py-3 text-sm tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors"
                    >
                      Get 10% Off
                    </button>

                    <p className="text-[10px] text-[#6B6B6B] text-center leading-relaxed">
                      By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
