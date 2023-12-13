<script setup lang="ts">
import { useDropZone } from "@vueuse/core";

const emit = defineEmits(["url"]);

const dropZoneRef = ref<HTMLDivElement>();

const processFile = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    emit("url", reader.result);
  };
};

function onDrop(files: File[] | null) {
  if (!files) return;
  const file = files[0];
  processFile(file);
}

const fileUploaded = (e: any) => {
  const file = e.target.files[0];
  processFile(file);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/png"],
});
</script>

<template>
  <div ref="dropZoneRef">
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <Icon
            name="carbon:cloud-upload"
            class="w-10 h-10 mb-3 text-gray-400 dark:text-gray-600"
          />
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" @input="fileUploaded" />
      </label>
    </div>
  </div>
</template>
