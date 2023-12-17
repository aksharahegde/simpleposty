<template>
  <NuxtPage />
  <UNotifications />
</template>
<script setup lang="ts">
useSeoMeta({
  twitterTitle: "Simple Posty | Create Social Media Posts",
  twitterDescription:
    "Create beautiful social media posts with just a few clicks",
  twitterImage: "/og_image.jpg",
  twitterCard: "summary",
  ogImage: "/og_image.jpg",
  ogType: "website",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon.png",
    },
  ],
});
</script>
