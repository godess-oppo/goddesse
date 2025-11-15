/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0B6E4F',   // brand primary
        accent: '#F2C88B',    // warm paper tone
        neutral: {
          100: '#FFFFFF',
          900: '#111111',
        },
      },
      spacing: {
        base: '8px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        elev1: '0 2px 6px rgba(17,17,17,0.03)',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['20px', { lineHeight: '28px' }],
        xl: ['28px', { lineHeight: '36px' }],
      },
    },
  },
  plugins: [],
};
