/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0F14",
          green: "#00C853",
          darkGreen: "#009624",
        },
      },
    },
  },
  plugins: [],
};