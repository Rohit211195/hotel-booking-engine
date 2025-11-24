/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate 900
          foreground: '#f8fafc', // Slate 50
        },
        secondary: {
          DEFAULT: '#ca8a04', // Yellow 600 (Gold-ish)
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f1f5f9', // Slate 100
          foreground: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
