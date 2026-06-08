/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        accent: {
          red: '#c0a062',
          gold: '#c0a062',
        },
        text: {
          DEFAULT: '#1a1a1a',
          muted: '#666666',
        },
      },
      fontFamily: {
        logo: ['Josefin Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
