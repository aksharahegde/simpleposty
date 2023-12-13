export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", '@nuxtjs/supabase'],
  ui: {
    primary: "teal",
    gray: "cool",
    global: true,
    icons: ["simple-icons", "solar"],
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/"],
    },
  },
});
