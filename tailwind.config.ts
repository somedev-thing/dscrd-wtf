import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lexend)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
        jua: ["var(--font-jua)", "sans-serif"],
        body: ["var(--font-lexend)", "sans-serif"],
      },
      colors: {
        electric: {
          DEFAULT: "#0072ff",
          hover: "#0062db",
          glow: "rgba(0, 114, 255, 0.15)",
        },
        void: "#09090b",
        surface: {
          bg: "#09090b",
          card: "#18181b",
          elevated: "#27272a", // Zinc 800
          border: "#27272a",
          hover: "#3f3f46", // Zinc 700
        },
      },
    },
  },
  plugins: [],
};

export default config;
