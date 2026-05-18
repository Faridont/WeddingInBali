import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#1a1625",
        sand: "#3d3428",
        palm: "#ff6b00",
        gold: "#ffb347",
        charcoal: "#f5e6c8",
        scroll: {
          DEFAULT: "#f4e4bc",
          dark: "#e8d4a8",
        },
        ninja: {
          orange: "#ff6b00",
          "orange-dark": "#e55a00",
          black: "#0a0a0f",
          navy: "#1a2744",
          blue: "#2d4a7c",
          leaf: "#4a7c59",
          ink: "#1c1410",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Impact", "sans-serif"],
      },
      boxShadow: {
        naruto: "0 4px 0 #0a0a0f, 0 8px 24px rgba(255, 107, 0, 0.25)",
        scroll: "inset 0 0 40px rgba(139, 90, 43, 0.15), 4px 4px 0 #1c1410",
      },
      backgroundImage: {
        "ninja-gradient":
          "linear-gradient(160deg, #0a0a0f 0%, #1a2744 45%, #2d1810 100%)",
        "scroll-texture":
          "linear-gradient(180deg, #f8edd4 0%, #f4e4bc 50%, #e8d4a8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
