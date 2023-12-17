<template>
  <header
    class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10"
  >
    <div
      class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-16 relative"
    >
      <Logo />
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <UButton
          v-if="!user"
          color="black"
          variant="solid"
          to="/login"
          icon="i-solar-login-2-line-duotone"
        >Login</UButton>
        <UserMenu v-else />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
</script>
