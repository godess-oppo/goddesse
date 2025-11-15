/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'risn-dark': '#050507',
        'risn-surface': '#101012',
        'risn-light-text': '#EAEAEA',
        'risn-mid-text': '#888888',
        'risn-border': '#222222',
        'risn-accent': '#4D5BFF',
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'accent-glow': '0 0 20px 5px rgba(77, 91, 255, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
