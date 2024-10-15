const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        title: '25px',
        subtitle: '14px',
        info: '12px',
      },
      colors: {
        'main-pink': '#DCAAFF',
        'main-red': '#e94057',
      },
      dropShadow: {
        btn: '0 4px 0px rgba(233, 64, 87, 0.25)',
      },
      animation: {
        modalUp: 'modalUp 1s ease-in-out',
        modalDown: 'modalDown 1s ease-in-out',
        fadeIn: 'fadeIn 1s',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        modalUp: {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(50vh)' },
        },
        modalDown: {
          '0%': { transform: 'translateY(50vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: {
          '0%': {
            opacity: '0.5',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      perspective: {
        none: 'none',
        1000: '1000px',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
    },
  },
  darkMode: 'class',
  plugins: ['prettier-plugin-tailwindcss', nextui()],
};
