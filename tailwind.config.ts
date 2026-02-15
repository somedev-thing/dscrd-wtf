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
        void: {
          DEFAULT: '#09090b',
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#0072ff',
          600: '#005ce6',
          700: '#0047b3',
          800: '#003380',
          900: '#18181b',
          950: '#09090b',
        },
        surface: {
          bg: '#09090b',
          card: '#18181b',
          border: '#27272a',
          hover: '#1f1f23',
          elevated: '#27272a',
        },
        electric: {
          DEFAULT: '#0072ff',
          hover: '#0065e6',
          glow: 'rgba(0, 114, 255, 0.15)',
        },
      },
      fontFamily: {
        heading: ['var(--font-outfit)'],
        body: ['var(--font-lexend)'],
        jua: ['var(--font-jua)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
