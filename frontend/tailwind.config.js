/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'camera-pink': '#F25790', // A cor rosa exata da logo
        'camera-dark': '#0f0f0f', // Fundo escuro/preto
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
