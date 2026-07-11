/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#fdf6e8', deep: '#faecc9' },
        peach: { DEFAULT: '#f5d9bb', deep: '#e2a06e' },
        blush: { DEFAULT: '#f6cddb', deep: '#e498b4' },
        ink: { DEFAULT: '#5b4636', light: '#8a6a56', faint: '#b89a86' },
        accent: '#e2986a',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        devanagari: ['var(--font-devanagari)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(180, 130, 110, 0.15)',
      },
    },
  },
  plugins: [],
};
