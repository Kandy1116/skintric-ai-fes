/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roobert', 'Rubik', 'sans-serif'],
        mono: ['Rubik', 'monospace'],
      },
      fontSize: {
        '[60px]': '60px',
        '[100px]': '100px',
      },
      colors: {
        '#1A1B1C': '#1A1B1C',
        '#A0A4AB': '#A0A4AB',
        '#e2e8f0': '#e2e8f0',
      }
    },
  },
  plugins: [],
}