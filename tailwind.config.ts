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
        sendara: {
          navy: '#0D1B2A',
          'deep-blue': '#1B4965',
          teal: '#0D7377',
          bright: '#0FB5BA',
          'teal-light': '#E0F7FA',
          'off-white': '#F8F9FA',
        },
        success: '#2D6A4F',
        danger: '#D62828',
        warning: '#E76F51',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
