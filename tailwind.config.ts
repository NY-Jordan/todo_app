import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./presentation/**/*.{js,ts,jsx,tsx,mdx}",
   './node_modules/preline/preline.js',
  ],
  safelist: [
    'btn-primary',
    'btn-secondary',
    'btn-dark',
    'btn-submit'
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require('daisyui'), require('preline/plugin'),require('tailwind-scrollbar'),],
};
export default config;
