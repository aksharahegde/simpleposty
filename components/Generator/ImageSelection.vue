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
      />
    </UFormGroup>
  </div>
  <span
    class="text-gray-400 text-sm bg-slate-800 px-2 max-w-fit py-1 rounded-md"
  >
    {{ url }}
  </span>
  <UDivider label="OR" />
  <GeneratorFileUpload @url="fileUploaded" />
</template>
<script setup>
import { IMAGE_PROVIDERS } from "~/constants/index";

const emit = defineEmits(["imageSelected"]);

const selectedProvider = ref(IMAGE_PROVIDERS[0].id);
const providerLabel = computed(() => {
  const provider = IMAGE_PROVIDERS.find((p) => p.id === selectedProvider.value);
  return provider.name;
});

const searchTerm = ref("");
const url = computed(() => {
  const url = `${selectedProvider.value}?${searchTerm.value.split(" ")[0]}`;
  if (searchTerm.value && searchTerm.value.length > 2) {
    setTimeout(() => {
      emit("imageSelected", url);
    }, 600);
  }
  return url;
});

const fileUploaded = (e) => {
  emit("imageSelected", e);
};
</script>
