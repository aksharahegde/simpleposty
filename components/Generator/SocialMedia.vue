<template>
  <div class="flex flex-col gap-4">
    <div class="text-sm font-medium text-gray-700 dark:text-gray-200">
      Platform
    </div>
    <div class="flex justify-around gap-4">
      <UTooltip
        v-for="(name, index) in platformNames"
        :key="index"
        :text="name"
      >
        <Icon
          :name="`simple-icons:${name}`"
          :class="{
            'dark:text-primary-500 text-primary-500': name === selectedPlatform,
          }"
          class="w-8 h-8 cursor-pointer hover:dark:text-primary-500 text-gray-400 dark:text-gray-600"
          @click="selectPlatform(name)"
        />
      </UTooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SOCIAL_MEDIA_IMAGE_SIZES } from "~/constants/image";

const emit = defineEmits(["platform"]);

const platformNames = Object.keys(SOCIAL_MEDIA_IMAGE_SIZES);
const selectedPlatform = ref("");
const selectPlatform = (name: string) => {
  selectedPlatform.value = name;
  emit("platform", selectedPlatform.value);
};

selectPlatform(platformNames[0]);
</script>
