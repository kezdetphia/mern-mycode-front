/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        secondary: "#f1c40f",
        background: "#f0f0f0",
        textcolor: "#333333",
        mygreen: "#2ecc71",
        error: "#e74c3c",
        cardbg: "#f9f9f9",
        highlight: "#5da9e9",
      },
    },
    fontFamily: {
      custom: ["Lato", "Roboto", "Helvetica", "Arial", "sans"],
    },
  },
  plugins: [],
};
