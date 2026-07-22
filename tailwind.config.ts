import type { Config } from "tailwindcss";

/**
 * Colors are wired to CSS custom properties (defined in globals.css
 * and set from theme.config.ts at build time) rather than hardcoded
 * hex values here. This is what makes the template reusable: a future
 * Jewellery or Sweet Shop build changes theme.config.ts and globals.css,
 * never this file.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        saffron: "rgb(var(--color-saffron) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        whatsapp: "rgb(var(--color-whatsapp) / <alpha-value>)",
        maroon: "#7A0C16",
        deepRed: "#B22222",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        card: "12px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
