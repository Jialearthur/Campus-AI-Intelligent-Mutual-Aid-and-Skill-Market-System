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
        primary: "#60A5FA", // 浅蓝
        secondary: "#FFB6C1", // 浅粉
        accent: {
          yellow: "#FFF9C4", // 鹅黄
          pink: "#FFC0CB",
          blue: "#B3E5FC",
          green: "#C8E6C9",
          orange: "#FFE0B2"
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
