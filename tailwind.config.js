/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mygreen: "#2ecc71",
        error: "#e74c3c",
        cardbg: "#f9f9f9",
        highlight: "#5da9e9",
        backg: "#2B2A33",
        urllink: "#1C1B22",
        search: "#42414D",
        darkpink: "#B64FC5",
        mediumpink: "#EA80F8",
        lightpink: "#FFB2FC",
      },
    },
    fontFamily: {
      custom: ["Lato", "Roboto", "Helvetica", "Arial", "sans"],
    },
  },
  plugins: [],
};
