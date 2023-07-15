/* eslint-disable global-require */
const path = require("path");

const fromRoot = (p) => path.join(__dirname, p);

module.exports = {
  content: ["index.html", fromRoot("./src/**/*.+(js|ts|tsx|mdx|md)")],
  theme: {
    extend: {
      colors: {
        invitely: "var(--color-invitely)",
        "invitely-light": "var(--color-invitely-light)",
        "invitely-dark": "var(--color-invitely-dark)",
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
