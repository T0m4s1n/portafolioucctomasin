module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "cascade-layers": { preserve: false },
        "custom-properties": false,
        "color-functional-notation": { preserve: false },
        "lab-function": { preserve: false },
        "color-mix": { preserve: false },
        "color-function": { preserve: false },
        "relative-color-syntax": { preserve: false },
      },
      preserve: false,
    },
    "postcss-remove-at-rules": {
      rules: ["property"],
    },
  },
};
