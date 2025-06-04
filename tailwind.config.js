/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E86AB',
        'primary-dark': '#1a6a8d',
        secondary: '#F18F01',
        'secondary-dark': '#d97d00',
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};