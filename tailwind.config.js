/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Make Montserrat the default sans font
      },
      colors: { 
        'nepal-red': '#DC143C',
        'nepal-blue': '#003893',
      }
    },
  },
  plugins: [],
} 