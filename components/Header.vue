<template>
  <nav class="border-b border-gray-800">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <Logo/>
      <div class="flex md:order-2 space-x-2">
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
  </nav>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
</script>
