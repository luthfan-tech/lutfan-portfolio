import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F8F8F8",
        foreground: "#0F0F0F",
        dark: {
          primary: "#0F0F0F",
          secondary: "#202020",
        },
        accent: {
          DEFAULT: "#5DD62C",
          bright: "#5DD62C",
          deep: "#337418",
        },
        muted: "#337418",
        surface: {
          DEFAULT: "#F8F8F8",
          raised: "#F8F8F8",
        },
        border: {
          DEFAULT: "#202020",
          dark: "#0F0F0F",
        },
      },
    },
  },
  plugins: [],
};
export default config;
