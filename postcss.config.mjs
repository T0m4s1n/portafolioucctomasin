const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "cascade-layers": {
          preserve: false,
        },
        "custom-properties": {
          preserve: false,
        },
      },
    },
  },
};

export default config;
