<template>
  <div class="flex gap-4">
    <UFormGroup label="Provider">
      <USelectMenu
        size="lg"
        v-model="selectedProvider"
        value-attribute="id"
        option-attribute="name"
        :options="IMAGE_PROVIDERS"
        :disabled="fetchingImage"
      >
        <template #label>
          <span class="truncate">{{ providerLabel }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>
    <UFormGroup label="Search">
      <UInput
        size="lg"
        color="white"
        placeholder="forest"
        v-model="searchTerm"
        :disabled="fetchingImage"
        @input="searchImage"
      />
    </UFormGroup>
  </div>
  <UDivider label="OR" />
  <UButton
    @click="getImage('https://source.unsplash.com/random/1280x720')"
    :disabled="fetchingImage"
    class="w-1/2 mx-auto justify-center"
  >
    <template #leading>
      <Icon name="solar:refresh-line-duotone" v-if="fetchingImage" />
      <Icon name="solar:shuffle-line-duotone" v-else />
    </template>
    {{ fetchingImage ? "Fetching..." : "Random Image" }}
  </UButton>
  <UDivider label="OR" />
  <GeneratorFileUpload
    :custom-classes="'w-full h-24'"
    :show-label="true"
    @url="fileUploaded"
  />
</template>
<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { IMAGE_PROVIDERS } from "~/constants/image";

const emit = defineEmits(["imageSelected"]);

const fetchingImage = ref(false);
const searchTerm = ref("");
const selectedProvider = ref(IMAGE_PROVIDERS[0].id);

const providerLabel = computed(() => {
  const provider: any = IMAGE_PROVIDERS.find(
    (p) => p.id === selectedProvider.value
  );
  return provider.name;
});

const searchImage = useDebounceFn(() => {
  const url = `${selectedProvider.value}?${searchTerm.value.split(" ")[0]}`;
  if (searchTerm.value && searchTerm.value.length > 2) {
    getImage(url);
  }
}, 600);

const getImage = async (url: string) => {
  fetchingImage.value = true;
  const dataUrl = await useFetchImage(url);
  emit("imageSelected", dataUrl);
  fetchingImage.value = false;
};

const fileUploaded = (e: any) => {
  emit("imageSelected", e);
};
</script>
