/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bronze: '#6B4B2A',
          espresso: '#4A331C',
          gold: '#C5A46D',
          champagne: '#E5D3B3',
          cream: '#F7F0DF',
          ivory: '#FBF8F3',
          sand: '#F2EAE0',
          rose: '#C23B6E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', '"Tajawal"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(107, 75, 42, 0.08)',
        'glass-lg': '0 16px 48px rgba(107, 75, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
