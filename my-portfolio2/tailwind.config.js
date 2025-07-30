import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-modak)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": `
          linear-gradient(#e1e4e6 3.5px, transparent 3.5px),
          linear-gradient(to right, #e1e4e6 3.5px, transparent 3.5px)
        `,
        "mesh-gradient-vertical": `
          linear-gradient(180deg, #acbedd 0%, #f5d8c8 100%, #c6ccdf 100%)
        `,
        "divider-top": `url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100.86 4.15'><path fill='%23fbd8c2' d='M0 0v3.5a9.07 9.07 0 0 0 9.37-1.67 9.07 9.07 0 0 0 12.1 0 9.07 9.07 0 0 0 12.11 0 9.07 9.07 0 0 0 12.06 0 9.07 9.07 0 0 0 12.11 0 9.07 9.07 0 0 0 12.08 0 9.07 9.07 0 0 0 12.09 0 9.07 9.07 0 0 0 12.08 0 9.07 9.07 0 0 0 6.86 2.28V.01z'/></svg>")`,
      },
      backgroundSize: {
        "grid-size": "46px 46px",
      },
      screens: {
        xl2: "2500px",
      },
      colors: {
        defaultText: "#333333",
        cvs: {
          darkBlue: "#355f7a",
          lightBlue: "#84c9ef",
          skyBlue: "#b4d2ed",
          lilac: "#cbbddd",
          pink: "#dcb5d4",
          rose: "#e3b1d2",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "zoom-in": "zoom-in 0.3s ease-in-out",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), require("tailwindcss-animate")],
  tailwindcss: {},
  autoprefixer: {},
};

module.exports = config;
