<template>
  <footer
    class="w-full bg-gray-100 dark:bg-transparent py-4 mt-4 border-t border-gray-200 dark:border-gray-700"
  >
    <div
      class="flex justify-between items-center mx-auto text-gray-600 dark:text-gray-300 flex-col md:flex-row gap-4"
    >
      <Logo />
      <div class="text-center">
        <span class="text-sm tracking-wide"
          >Copyright © {{ new Date().getFullYear() }} <span id="year"></span> |
          All right reserved.</span
        >
      </div>
      <div class="flex items-center">
        <UButton
          label="@akshara_dev"
          to="https://twitter.com/akshara_dev"
          target="_blank"
          variant="link"
          icon="i-simple-icons-x"
        />
        <UButton
          label="GitHub"
          to="https://github.com/aksharahegde/simpleposty"
          target="_blank"
          variant="link"
          icon="i-simple-icons-github"
        />
      </div>
    </div>
  </footer>
</template>
