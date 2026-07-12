/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        accent: ['"Yatra One"', 'serif'],
      },
      colors: {
        // Legacy tokens (used by older pages) — keep
        'nepal-red': '#DC143C',
        'nepal-blue': '#003893',
        // New system
        ink: '#060B1D',
        midnight: '#0A1633',
        royal: '#003893',
        'royal-lite': '#2E63D8',
        crimson: '#DC143C',
        'crimson-deep': '#A50F2D',
        lantern: '#F5A623',
        rice: '#FAF5EC',
        'rice-dark': '#EFE7D6',
      },
      letterSpacing: {
        mega: '0.35em',
      },
    },
  },
  plugins: [],
}
