/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: { DEFAULT: '#2b1a0f', light: '#432a1a', lighter: '#5c3c26' },
        butter: { DEFAULT: '#f3d879', deep: '#e8c157' },
        peach: { DEFAULT: '#f4a97a', deep: '#e88a52' },
        blush: { DEFAULT: '#ffb8cf', deep: '#f591b3' },
        ink: { DEFAULT: '#f7ecd3', light: '#d9c3a3', faint: '#b39878' },
        accent: { DEFAULT: '#f4a97a', deep: '#e88a52' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        devanagari: ['var(--font-devanagari)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0, 0, 0, 0.35)',
        lift: '0 12px 32px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
