import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E1117",
        "background-2": "#02040A",
        "background-focused": "#151B23",
        foreground: "#F0F6FB",
        "grayed-out": "#9098A1",
        "gray-1": "#3C444D",
        primary: "#238636",
      },
    },
  },
  plugins: [],
} satisfies Config;
