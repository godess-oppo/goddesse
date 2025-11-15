// 🧬 ADAPTIVE TAILWIND CONFIG - Evolves Based on User Engagement
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // 🎨 Adaptive Color System - Mutates Based on Engagement
      colors: {
        primary: {
          DEFAULT: 'var(--ai-primary-default, #3b82f6)', // 🧠 Learns optimal primary color
          light: 'var(--ai-primary-light, #60a5fa)',
          dark: 'var(--ai-primary-dark, #2563eb)',
          contrast: 'var(--ai-primary-contrast, #ffffff)'
        },
        secondary: {
          DEFAULT: 'var(--ai-secondary-default, #8b5cf6)', // 🧠 Learns optimal secondary color
          light: 'var(--ai-secondary-light, #a78bfa)',
          dark: 'var(--ai-secondary-dark, #7c3aed)',
          contrast: 'var(--ai-secondary-contrast, #ffffff)'
        },
        // 🌈 Dynamic color palette that adapts to user preferences
        adaptive: {
          50: 
        },
        // 🌈 Dynamic color palette that adap

        },
       
'var(--adaptive-50, #f0f9ff)',
          100: 'var(--adaptive-100, #e0f2fe)',
          200: 'var(--adaptive-200, #bae6fd)',
          300: 'var(--adaptive-300, #7dd3fc)',
          400: 'var(--adaptive-400, #38bdf8)',
          500: 'var(--adaptive-500, #0ea5e9)',
          600: 'var(--adaptive-600, #0284c7)',
          700: 'var(--adaptive-700, #0369a1)',
          800: 'var(--adaptive-800, #075985)',
          900: 'var(--adaptive-900, #0c4a6e)'
        }
      },
      // 📐 Adaptive Spacing System
      spacing: {
        
        }
      },
      // 📐 Adaptive Spacing System
'adaptive-xs': 'var(--spacing-xs, 0.5rem)',
        'adaptive-sm': 'var(--spacing-sm, 1rem)',
        'adaptive-md': 'var(--spacing-md, 1.5rem)',
        
       
'adaptive-lg': 'var(--spacing-lg, 2rem)',
        'adaptive-xl': 'var(--spacing-xl, 3rem)'
      },
      // 🎯 Adaptive Typography
      fontSize: {
        
      },
     
'adaptive-sm': ['var(--font-size-sm, 0.875rem)', { lineHeight: '1.25rem' }],
        'adaptive-base': ['var(--font-size-base, 1rem)', { lineHeight: '1.5rem' }],
        'adaptive-lg': ['var(--font-size-lg, 1.125rem)', { lineHeight: '1.75rem' }],
        'adaptive-xl': ['var(--font-size-xl, 1.25rem)', { lineHeight: '1.75rem' }],
        'adaptive-2xl': ['var(--font-size-2xl, 1.5rem)', { lineHeight: '2rem' }]
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      // 🧬 Self-Optimizing Utility Classes
      const adaptiveUtilities = {
        
      // 🧬 Self-Optimizing Utility Classes
      const adaptiveUtilities = {
'.adaptive-shadow': {
          'box-shadow': 'var(--adaptive-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))'
        },
        '.adaptive-radius': {
          'border-radius': 'var(--adaptive-radius, 0.5rem)'
        },
        '.adaptive-transition': {
          'transition': 'var(--adaptive-transition, all 0.3s cubic-bezier(0.4, 0, 0.2, 1))'
        }
      };
      addUtilities(adaptiveUtilities);
    })
  ]
};
