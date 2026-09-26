/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sketch: {
          bg: '#ffffff',
          darkBg: '#090a0f',
          card: '#ffffff',
          darkCard: '#141622',
          border: '#000000',
          darkBorder: '#ffffff',
          accent: '#2563eb',
        }
      },
      fontFamily: {
        sketch: ['"Cabin Sketch"', '"Fredericka the Great"', 'cursive'],
        hand: ['"Kalam"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'sketch': '3.5px 4.5px 0px 0px #000000',
        'sketch-dark': '3.5px 4.5px 0px 0px #38bdf8',
        'sketch-lg': '5px 6.5px 0px 0px #000000',
        'sketch-lg-dark': '5px 6.5px 0px 0px #38bdf8',
        'sketch-sm': '2.5px 2.5px 0px 0px #000000',
        'sketch-sm-dark': '2.5px 2.5px 0px 0px #38bdf8',
      }
    },
  },
  plugins: [],
}
