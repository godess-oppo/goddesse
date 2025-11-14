// design-tokens.ts
export const tokens = {
  colors: {
    noir: '#0A0A0A',          // Primary background
    pearl: '#F8F7F4',          // Inverted sections
    smoke: '#6B6B6B',          // Secondary text
    ember: '#C7522A',          // Accent (CTAs, badges)
    midnight: '#1A1A2E',       // Navigation overlay
    gold: '#D4AF37',           // Premium highlights
  },
  typography: {
    display: "'Playfair Display', serif",  // Headlines
    body: "'Inter', sans-serif",            // UI text
    mono: "'JetBrains Mono', monospace",    // Timestamps, prices
  },
  spacing: {
    unit: 8,                                // Base 8pt grid
    section: 'clamp(4rem, 10vw, 12rem)',   // Vertical rhythm
  },
  animations: {
    ease: 'cubic-bezier(0.76, 0, 0.24, 1)', // Custom easing
    duration: {
      fast: '200ms',
      medium: '500ms',
      slow: '1000ms',
    }
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1440px',
    wide: '1920px',
  }
};
