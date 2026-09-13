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
        ember: {
          deep: "#0B0B0C",
          red: "#9F0F1F",
          cream: "#F2D3B1",
          orange: "#FF4D1A",
          gray: "#2E2A29",
        },
      },
      fontFamily: {
        changa: ["Changa", "sans-serif"],
        tajawal: ["Tajawal", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
