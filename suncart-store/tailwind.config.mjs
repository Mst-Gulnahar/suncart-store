/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        sun: "#F9C12F",
        dragonfruit: "#DA1C5C",
        tangerine: "#F15A29",
        raspberry: "#FF5DD4",
        sunset: "#FF9846",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        suncart: {
          "primary": "#DA1C5C",
          "secondary": "#F9C12F",
          "accent": "#F15A29",
          "neutral": "#2A2E37",
          "base-100": "#FFF5E6", 
          "info": "#FF5DD4",
          "success": "#FF9846",
        },
      },
    ],
  },
};