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
        teal: {
          DEFAULT: '#0B5D5B',
          dark: '#073E3D',
          hover: '#094B49',
          light: '#0E7471',
          tint: '#E5F1F0',
        },
        yellow: {
          DEFAULT: '#FFCB3D',
          hover: '#EDB827',
          dim: '#FFF5D6',
        },
        ink: {
          DEFAULT: '#12201F',
          surface: '#182B2A',
          muted: '#405250',
          border: '#243C3A',
        },
        mist: {
          DEFAULT: '#EFF3F2',
          surface: '#E7ECEB',
          dark: '#DFE5E4',
        },
        steel: {
          DEFAULT: '#607270',
          light: '#8E9E9C',
          dark: '#3E4E4C',
        },
        mint: {
          DEFAULT: '#DDEEEC',
          tint: '#EEF7F6',
          dark: '#C5DFDC',
        },
        white: '#FFFFFF',
        error: '#D9383A',
      },
      fontFamily: {
        headline: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        docket: ['"Courier Prime"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'pill': '99px',
        'card': '18px',
        'card-lg': '24px',
        'panel': '28px',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      boxShadow: {
        'card': '0 4px 18px -2px rgba(18, 32, 31, 0.06), 0 1px 3px rgba(18, 32, 31, 0.04)',
        'card-hover': '0 16px 32px -8px rgba(11, 93, 91, 0.14), 0 4px 12px -2px rgba(18, 32, 31, 0.06)',
        'featured': '0 16px 36px -6px rgba(11, 93, 91, 0.35), 0 6px 14px -3px rgba(11, 93, 91, 0.2)',
        'pill-hover': '0 4px 12px rgba(255, 203, 61, 0.35)',
      }
    },
  },
  plugins: [],
}
