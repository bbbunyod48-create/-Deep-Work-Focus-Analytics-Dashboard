/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        slate: { 850: '#1a1f2e', 950: '#0f1219' },
        emerald: { 450: '#34d399' }
      }
    },
  },
  plugins: [],
}