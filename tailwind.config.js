/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Hiragino Maru Gothic Pro",
          "Calibri",
          "Helvetica Neue",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".rounded-inherit": { "border-radius": "inherit" },
        ".appearance-number-none::-webkit-outer-spin-button, .appearance-number-none::-webkit-inner-spin-button":
          {
            "-webkit-appearance": "none",
            margin: 0,
          },
        "input[type=number].appearance-number-none": {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
};
