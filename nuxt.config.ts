import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lite-youtube"].includes(tag),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@pinia/nuxt", "@hebilicious/vue-query-nuxt", "@vueuse/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
