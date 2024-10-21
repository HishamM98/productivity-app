/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      roboto: ["Roboto", "Arial", "sans-serif"],
      poppins: ["Poppins", "Arial", "sans-serif"],
      merienda: ["Merienda", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        DarkGreen: "#181C14",
        DarkGray: "#3C3D37",
        SageGreen: "#697565",
        LightBeige: "#ECDFCC",
      },
    },
  },
  plugins: [],
};
