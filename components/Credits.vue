<template>
  <section>
    <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
      <h5 class="mb-6 text-center text-xl font-bold md:mb-10 lg:mb-12">
        Special thanks
      </h5>
      <div
        class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 sm:gap-12 md:gap-6"
      >
        <a
          v-for="item in credits"
          :key="item.name"
          :href="item.url"
          class="mx-auto text-4xl hover:text-primary-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="`i-simple-icons-${item.name}`" />
        </a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const credits = [
  {
    name: "nuxtdotjs",
    url: "https://nuxt.com/",
  },
  {
    name: "supabase",
    url: "https://supabase.com/",
  },
  {
    name: "tailwindcss",
    url: "https://tailwindcss.com/",
  },
  {
    name: "unsplash",
    url: "https://unsplash.com/",
  },
];
</script>
