<template>
  <UCard
    v-for="i in 3"
    :key="i"
    :ui="{
      header: {
        padding: 'px-4 py-2 sm:px-6',
      },
    }"
  >
    <template #header>
      <USkeleton class="h-6" />
    </template>
    <USkeleton class="h-20" />
  </UCard>
</template>
