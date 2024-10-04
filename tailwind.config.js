/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // все файлы в папке app
    "./app/tabs/**/*.{js,jsx,ts,tsx}", // все файлы в папке tabs
    "./assets/**/*.{js,jsx,ts,tsx}", // все файлы в папке assets (если в ней есть файлы JS/TS)
    "./components/**/*.{js,jsx,ts,tsx}", // все файлы в папке components
    "./constants/**/*.{js,jsx,ts,tsx}" // все файлы в папке constants
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
