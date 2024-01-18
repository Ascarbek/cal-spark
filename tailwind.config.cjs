const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        fontMono: "'Roboto Mono', monospace",
      },
      colors: {
        main: {
          ...colors.teal,
        },
      },
    },
  },
  plugins: [],
};
