<template>
  <div class="mx-auto w-full max-w-7xl px-5 py-16">
    <div
      class="flex w-full flex-col items-center px-6 py-16 text-center text-white"
    >
      <h2
        class="mb-6 flex-col text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12"
      >
        No saved settings.
      </h2>
      <div class="mx-auto">
        <ul
          class="mb-6 flex flex-col flex-nowrap gap-3 md:mb-10 md:flex-row lg:mb-12"
        >
          <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
            <Icon
              name="carbon:color-palette"
              class="mr-2 inline-block h-4 w-4"
            />
            <p class="">Color</p>
          </li>
          <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
            <Icon name="carbon:gradient" class="mr-2 inline-block h-4 w-4" />
            <p class="">Gradient</p>
          </li>
          <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
            <Icon name="carbon:image" class="mr-2 inline-block h-4 w-4" />
            <p class="">
              Image <span class="text-gray-500">(coming soon)</span>
            </p>
          </li>
        </ul>
      </div>
      <UButton
        color="black"
        variant="solid"
        size="lg"
        icon="i-solar-add-circle-outline"
        label="Get started"
        @click.stop="close"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>