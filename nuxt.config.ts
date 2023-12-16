export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxtseo/module",
    "nuxt-og-image",
  ],
  ui: {
    primary: "teal",
    gray: "cool",
    global: true,
    icons: ["simple-icons", "solar"],
    chipColor: "black",
    notifications: {
      position: "top-0 bottom-auto",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/"],
    },
  },
  site: {
    url: "https://simpleposty.vercel.app",
    name: "Simple Posty | Create Social Media Posts",
    description: "Create beautiful social media posts with just a few clicks",
    image: "/og_image.jpg",
    defaultLocale: "en",
    identity: {
      type: "Person",
    },
    twitter: "@akshara_dev",
  },
});
