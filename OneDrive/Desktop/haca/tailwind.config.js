/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        logo: ["NeueMontreal", "Inter", "sans-serif"], // for Haris&Co.
      },
    },
  },
  plugins: [],
};
