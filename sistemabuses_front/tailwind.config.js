/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        civaPurple: '#5B2C6F',
        civaFuchsia: '#E91E63',
        civaPink: '#F8BBD0',
        civaLightGray: '#F5F5F5',
      },
    },
  },
  plugins: [],
}