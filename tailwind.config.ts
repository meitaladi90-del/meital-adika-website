import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0e8",
        gold: {
          DEFAULT: "#c9a97a",
          light: "#e8d5b0",
          dark: "#a07840",
        },
        brown: {
          DEFAULT: "#5a3e28",
          light: "#7a5540",
          dark: "#3a2518",
        },
        sage: {
          DEFAULT: "#6b7c5e",
          light: "#8fa07f",
          dark: "#4a5840",
        },
        terracotta: {
          DEFAULT: "#b86040",
          light: "#d4855e",
          dark: "#8a4028",
        },
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a97a 0%, #e8d5b0 50%, #c9a97a 100%)",
        "cream-gradient": "linear-gradient(180deg, #f5f0e8 0%, #ede5d4 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
