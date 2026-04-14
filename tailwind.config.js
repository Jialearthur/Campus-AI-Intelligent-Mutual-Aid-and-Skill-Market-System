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
        primary: "#FF6B35",
        secondary: "#4ECDC4",
        accent: {
          yellow: "#FFE66D",
          pink: "#FF6B81",
        },
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
