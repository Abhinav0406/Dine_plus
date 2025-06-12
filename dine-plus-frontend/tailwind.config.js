/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          accent: '#4ade80',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 