/* eslint-disable global-require */
const path = require("path");

const fromRoot = (p) => path.join(__dirname, p);

module.exports = {
  content: ["index.html", fromRoot("./src/**/*.+(js|ts|tsx|mdx|md)")],
  theme: {
    extend: {
      colors: {
        supervan: "var(--color-supervan)",
        "supervan-light": "var(--color-supervan-light)",
        "supervan-dark": "var(--color-supervan-dark)",
      },
      fontFamily: {
        airstrike: "Airstrike, sans-serif",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
