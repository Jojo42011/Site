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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: {
          50: "#f6f6f7",
          100: "#e8e8ea",
          200: "#d1d1d5",
          300: "#b0b0b7",
          400: "#888892",
          500: "#6b6b76",
          600: "#575761",
          700: "#494950",
          800: "#3f3f44",
          900: "#38383c",
          950: "#1a1a1d",
        },
        purple: {
          glow: "#8b5cf6",
          dark: "#6b21a8",
          light: "#a78bfa",
        },
        blue: {
          deep: "#0a0a0d",
          navy: "#1e1e24",
          electric: "#6366f1",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "privacy-glow": "linear-gradient(135deg, #6b21a8 0%, #1e293b 50%, #0f172a 100%)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

