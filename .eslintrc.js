const config = require.resolve("@spv/scripts/eslint");

module.exports = {
  extends: config,
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "react/destructuring-assignment": "off",
  },
  settings: {
    tailwindcss: {
      config: "tailwind.config.js",
      whitelist: [
        "page",
        "col",
        "row",
        "card",
        "page-actions",
        "btn-primary",
        "btn-accent",
        "badge",
        "divider-v",
        "spv-link",
        "spv-link-accent",
        "btn-icon-primary",
      ],
    },
  },
};
