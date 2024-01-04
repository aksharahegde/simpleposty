<template>
  <GeneratorProviderImage @image-selected="fileUploaded"/>
  <UDivider label="OR" />
  <GeneratorFileUpload
    id="bg-upload"
    :custom-classes="'w-full h-24'"
    :show-label="true"
    @url="fileUploaded"
  />
</template>
<script setup lang="ts">
const emit = defineEmits(["imageSelected"]);

const fileUploaded = (e: any) => {
  emit("imageSelected", e);
};
</script>
