<script setup lang="ts">
import { useDropZone } from "@vueuse/core";

const emit = defineEmits(["url"]);
const toast = useToast()

const dropZoneRef = ref<HTMLDivElement>();

const processFile = (file: File) => {
  if (['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      emit("url", reader.result);
    };
  } else {
    toast.add({
      title: 'Invalid file type',
      description: 'Upload only png, jpeg, jpg and svg files',
      icon: 'i-solar-warning-circle-line-duotone',
      color: 'red',
    })
  }
};

function onDrop(files: File[] | null) {
  if (!files) return;
  processFile(files[0]);
}

const fileUploaded = (e: any) => {
  processFile(e.target.files[0]);
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"],
});
</script>

<template>
  <div ref="dropZoneRef">
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex items-center justify-center gap-3 pt-5 pb-6">
          <Icon
            name="carbon:cloud-upload"
            class="w-10 h-10 text-gray-400 dark:text-gray-600"
          />
          <div class="">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">svg, png jpg</p>
          </div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          @input="fileUploaded"
        />
      </label>
    </div>
  </div>
</template>
