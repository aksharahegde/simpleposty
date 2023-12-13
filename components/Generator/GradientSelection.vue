<template>
  <div
    class="space-y-4 flex flex-col items-center justify-center p-3 border border-gray-600 rounded-md"
  >
    <UButton>Preset</UButton>
    <UDivider label="OR" :ui="{ label: 'text-xs' }" />
    <div class="flex w-3/4 justify-around gap-4">
      <UFormGroup label="From">
        <UInput
          size="lg"
          color="white"
          type="color"
          v-model="config.from"
          :ui="{
            base: 'w-10 h-10 cursor-pointer',
            padding: { lg: 'py-0 px-1' },
            rounded: 'rounded-full',
          }"
        />
      </UFormGroup>
      <UFormGroup label="Via">
        <UInput
          size="lg"
          color="white"
          type="color"
          v-model="config.via"
          :ui="{
            base: 'w-10 h-10 cursor-pointer',
            padding: { lg: 'py-0 px-1' },
            rounded: 'rounded-full',
          }"
        />
      </UFormGroup>
      <UFormGroup label="To">
        <UInput
          size="lg"
          color="white"
          type="color"
          v-model="config.to"
          :ui="{
            base: 'w-10 h-10 cursor-pointer',
            padding: { lg: 'py-0 px-1' },
            rounded: 'rounded-full',
          }"
        />
      </UFormGroup>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchDeep } from "@vueuse/core";

const emit = defineEmits(["gradient"]);
const config = ref({
  from: "#0123de",
  via: "#fc026c",
  to: "#1ee103",
});

watchDeep(config, (obj) => {
  emit("gradient", obj);
});
</script>
