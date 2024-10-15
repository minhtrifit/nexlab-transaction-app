/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#15a162",
        "secondary-green": "#18b56e",
        "light-bg": "#fffffe",
        "dark-bg": "#16161a",
      },
    },
  },
  plugins: [],
};
