/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#6B4B2A',
          bronze: '#785634',
          bronzeDark: '#52381E',
          gold: '#C49A5B',
          goldLight: '#F3DFB9',
          cream: '#FBF8F3',
          sand: '#F3ECE2',
          rose: '#C82B6B',
          ink: '#241B14',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', '"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
        display: ['Montserrat', '"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Cairo', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(107, 75, 42, 0.08)',
        'glass-lg': '0 18px 48px rgba(107, 75, 42, 0.14)',
      },
    },
  },
  plugins: [],
};
