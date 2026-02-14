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
        background: "var(--background)",
        foreground: "var(--foreground)",
        void: "#050508",
        electric: "#5865F2",
        "phantom-accent": "#5865F2",
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-lexend)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        sans: ["var(--font-lexend)", "sans-serif"], // Default sans to Lexend for consistency
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-pattern': '24px 24px',
      }
    },
  },
  plugins: [],
};
export default config;
