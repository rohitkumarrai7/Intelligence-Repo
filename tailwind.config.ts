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
        background: "#FFFFFF",
        surface: "#F8FAFC", // Slate 50
        "surface-hover": "#F1F5F9", // Slate 100
        primary: {
          DEFAULT: "#6366F1", // Indigo 500
          hover: "#4F46E5", // Indigo 600
          light: "#EEF2FF", // Indigo 50
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber 500
          hover: "#D97706", // Amber 600
          light: "#FFFBEB", // Amber 50
        },
        success: "#10B981", // Emerald 500
        error: "#EF4444", // Rose 500
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        text: {
          primary: "#1E293B", // Slate 800
          secondary: "#475569", // Slate 600
          muted: "#64748B", // Slate 500
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "mesh-drift": "mesh-drift 20s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "count-up": "count-up 2s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "mesh-drift": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;