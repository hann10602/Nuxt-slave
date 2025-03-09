module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended", // or 'plugin:vue/recommended' for Vue 2
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": "warn",
    "vue/multi-word-component-names": "off", // Example rule
  },
};
