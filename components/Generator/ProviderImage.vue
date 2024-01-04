<template>
  <div class="gap-4 flex flex-col items-center">
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
      <UButton
        @click="randomizeSearch"
        :disabled="fetchingImage"
        class="w-8 mb-0.5 h-9 mt-auto"
      >
        <template #leading>
          <Icon name="solar:refresh-line-duotone" v-if="fetchingImage" />
          <Icon name="solar:shuffle-line-duotone" v-else />
        </template>
      </UButton>
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
  </div>
</template>
<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { IMAGE_PROVIDERS } from "~/constants/image";

const emit = defineEmits(["imageSelected"]);

const fetchingImage = ref(false);
const searchTerm = ref("");
const selectedProvider = ref(IMAGE_PROVIDERS[0].id);

const getUrl = () =>
  `${selectedProvider.value}?${encodeURIComponent(searchTerm.value)}`;

const getImage = async (url: string) => {
  fetchingImage.value = true;
  const dataUrl = await useFetchImage(url);
  emit("imageSelected", dataUrl);
  fetchingImage.value = false;
};
const providerLabel = computed(() => {
  const provider: any = IMAGE_PROVIDERS.find(
    (p) => p.id === selectedProvider.value
  );
  return provider.name;
});

const randomizeSearch = () => {
  const url = getUrl();
  getImage(url);
};

const searchImage = useDebounceFn(() => {
  if (searchTerm.value && searchTerm.value.length > 2) {
    getImage(getUrl());
  }
}, 600);
</script>
