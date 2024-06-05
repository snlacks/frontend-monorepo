/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};

export default config;
