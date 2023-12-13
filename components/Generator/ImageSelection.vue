<template>
  <div class="flex gap-4">
    <UFormGroup label="Provider">
      <USelectMenu
        size="lg"
        v-model="selectedProvider"
        value-attribute="id"
        option-attribute="name"
        :options="IMAGE_PROVIDERS"
      >
        <template #label>
          <span class="truncate">{{ providerLabel }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>
    <UFormGroup label="Search" help="Enter a keyword to search for an image">
      <UInput
        size="lg"
        color="white"
        placeholder="forest"
        v-model="searchTerm"
        @input="searchImage"
      />
    </UFormGroup>
  </div>
  <UDivider label="OR" />
  <GeneratorFileUpload @url="fileUploaded" />
</template>
<script setup>
import { useDebounceFn } from "@vueuse/core";
import { IMAGE_PROVIDERS } from "~/constants/index";

const emit = defineEmits(["imageSelected"]);

const selectedProvider = ref(IMAGE_PROVIDERS[0].id);
const providerLabel = computed(() => {
  const provider = IMAGE_PROVIDERS.find((p) => p.id === selectedProvider.value);
  return provider.name;
});

const searchTerm = ref("");
const searchImage = useDebounceFn(() => {
  const url = `${selectedProvider.value}?${searchTerm.value.split(" ")[0]}`;
  if (searchTerm.value && searchTerm.value.length > 2) {
    emit("imageSelected", url);
  }
}, 600);

const fileUploaded = (e) => {
  emit("imageSelected", e);
};
</script>
