/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/h1_banner-4.jpg')",
      },
      screens: {
        "custom-lg": "1200px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["default", "light"],
  },
};
