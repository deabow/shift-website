import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          deep: "#0B0B0C",
          red: "#9F0F1F",
          cream: "#F2D3B1",
          orange: "#FF4D1A",
          gray: "#2E2A29",
        },
        theme: {
          bg: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          card: "var(--bg-card)",
          "card-hover": "var(--bg-card-hover)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          border: "var(--border-color)",
          "border-subtle": "var(--border-subtle)",
          cta: "var(--accent-cta)",
          "cta-hover": "var(--accent-cta-hover)",
          spark: "var(--accent-spark)",
        },
      },
      fontFamily: {
        alexandria: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
        changa: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
        tajawal: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
        grotesk: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
        inter: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
        sans: ["var(--font-alexandria)", "Alexandria", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
