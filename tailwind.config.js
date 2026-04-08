/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1EB',
        forest: '#1B4332',
        sage: '#40916C',
        earth: '#8B6914',
        stone: '#4A4A4A',
        sky: '#2D6A8A',
      },
    },
  },
  plugins: [],
}
