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
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
