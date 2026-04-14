/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: {
          yellow: "#FFE66D",
          pink: "#FF85A2",
          purple: "#A855F7",
          blue: "#60A5FA",
          green: "#34D399",
          orange: "#FB923C"
        },
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
};
