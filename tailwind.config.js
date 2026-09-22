/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      fontSize: {
        '2xs': '0.6875rem',
        '3xs': '0.625rem'
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.3em'
      },
      boxShadow: {
        'atelier': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'totem': '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }
    },
  },
  plugins: [],
}
