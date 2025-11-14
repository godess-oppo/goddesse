# lib/temporal/design-systems.ts
cat > lib/temporal/design-systems.ts <<'EOF'
export const eraDesignSystems = {
  '1920s': {
    colors: {
      primary: '#d4af37', // Art Deco Gold
      secondary: '#2c5530', // Deep Green
      accent: '#7b3f00', // Rich Brown
      background: '#0a0a0a',
      text: '#f5f5f5',
      muted: '#a8a8a8'
    },
    typography: {
      fontFamily: "'Playfair Display', serif",
      heading: "'Cinzel', serif",
      body: "'Cormorant Garamond', serif"
    },
    spacing: {
      tight: '0.5rem',
      cozy: '1rem',
      comfortable: '2rem',
      spacious: '4rem'
    },
    effects: {
      shadow: '0 4px 6px -1px rgba(212, 175, 55, 0.1)',
      glow: '0 0 20px rgba(212, 175, 55, 0.3)',
      border: '2px solid #d4af37'
    }
  },
  '1990s': {
    colors: {
      primary: '#00ff00', // Cyber Green
      secondary: '#ff00ff', // Magenta
      accent: '#0000ff', // Electric Blue
      background: '#000000',
      text: '#00ff00',
      muted: '#666666'
    },
    typography: {
      fontFamily: "'Courier New', monospace",
      heading: "'Impact', sans-serif",
      body: "'Arial', sans-serif"
    },
    spacing: {
      tight: '2px',
      cozy: '8px',
      comfortable: '16px',
      spacious: '32px'
    },
    effects: {
      shadow: '0 0 10px #00ff00',
      glow: '0 0 20px #ff00ff',
      border: '1px solid #00ff00'
    }
  },
  '2050s': {
    colors: {
      primary: '#00ffff', // Cyan
      secondary: '#ff6bff', // Neural Pink
      accent: '#00ff88', // Bio Green
      background: '#0a0a0a',
      text: '#ffffff',
      muted: '#888888'
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      heading: "'Orbitron', sans-serif",
      body: "'Exo 2', sans-serif"
    },
    spacing: {
      tight: '0.25rem',
      cozy: '0.75rem',
      comfortable: '1.5rem',
      spacious: '3rem'
    },
    effects: {
      shadow: '0 0 0 1px rgba(0, 255, 255, 0.1)',
      glow: '0 0 30px rgba(0, 255, 255, 0.2)',
      border: '1px solid rgba(0, 255, 255, 0.3)'
    }
  }
};

export const eraAnimations = {
  '1920s': `
    @keyframes artDecoFade {
      0% { opacity: 0; transform: translateY(20px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .era-transition { animation: artDecoFade 0.8s ease-out; }
  `,
  '1990s': `
    @keyframes cyberGlitch {
      0% { transform: translateX(0); }
      20% { transform: translateX(-2px); }
      40% { transform: translateX(2px); }
      60% { transform: translateX(-1px); }
      80% { transform: translateX(1px); }
      100% { transform: translateX(0); }
    }
    .era-transition { animation: cyberGlitch 0.3s ease-in-out; }
  `,
  '2050s': `
    @keyframes quantumFloat {
      0% { transform: translateY(10px) scale(0.98); opacity: 0; }
      50% { transform: translateY(-5px) scale(1.02); opacity: 0.8; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    .era-transition { animation: quantumFloat 0.6s ease-out; }
  `
};
EOF
