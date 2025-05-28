/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4,0,0.2,1)'
      }
    }
  },
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
