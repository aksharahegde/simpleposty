<template>
  <header
    class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-16"
    >
      <div class="lg:flex-1 flex items-center gap-1.5">
        <nuxt-link
          aria-current="page"
          href="/"
          class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
          aria-label="Logo"
        >
          SimplePosty
        </nuxt-link>
      </div>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <UButton
          color="black"
          variant="solid"
          to="/login"
          icon="i-solar-login-2-line-duotone"
          >Login</UButton
        >
      </div>
    </div>
  </header>
</template>
