/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'campus-navy': '#0F172A',
        'campus-blue': '#1D4ED8',
        'campus-accent': '#3B82F6',
        'campus-ice': '#EFF6FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
