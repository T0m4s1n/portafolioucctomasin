module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-remove-at-rules": {
      rules: ["property"],
    },
    "postcss-preset-env": {
      stage: 1,
      features: {
        "cascade-layers": { preserve: false },
        "custom-properties": { preserve: false },
        "color-functional-notation": { preserve: false },
        "lab-function": { preserve: false },
        "color-mix": { preserve: false },
        "color-function": { preserve: false },
        "relative-color-syntax": { preserve: false },
        "is-pseudo-class": { preserve: false },
        "not-pseudo-class": { preserve: false },
      },
      preserve: false,
    },
    "./postcss-fix-tailwind-v4.js": {},
  },
};
