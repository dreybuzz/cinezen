/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      display: ["group-hover"],
      fontSize: {
        "2xs": ["0.675rem"],
        "3xs": ["0.5rem"]
      },
      screens: {
        "3xl": "2048px",
        "4xl": "2560px"
      }
    },
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
      sen: ["Sen", "sans-serif"]
    }
  },
  plugins: [],
}
