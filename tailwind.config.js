/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        "blue-gray": "#aebed8", // ton gris bleuté perso
      },
    },
  },
  plugins: [],
}
