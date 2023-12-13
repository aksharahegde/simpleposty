<template>
  <div class="flex flex-col gap-4">
    <UFormGroup label="Heading" class="w-full">
      <UInput
        size="lg"
        color="white"
        placeholder="Title"
        class="w-full"
        v-model="config.title"
      />
    </UFormGroup>
    <UFormGroup label="Content" class="w-full">
      <UTextarea
        placeholder="Content"
        v-model="config.description"
        class="w-full"
        :rows="6"
      />
    </UFormGroup>
    <h2 class="text-lg text-gray-700 dark:text-gray-300">Customization</h2>
    <UFormGroup label="Text Color" class="w-full">
      <UInput
        size="lg"
        color="white"
        type="color"
        v-model="config.textColor"
        :ui="{
          base: 'w-10 h-10 cursor-pointer',
          padding: { lg: 'py-0 px-1' },
          rounded: 'rounded-full',
        }"
      />
    </UFormGroup>
    <URadioGroup
      v-model="config.backgroundType"
      legend="Background type"
      class="background-type"
      :options="BACKGROUND_TYPES"
    />
    <UFormGroup
      v-if="config.backgroundType === BACKGROUND_TYPE_COLOR"
      class="w-full"
    >
      <UInput
        size="lg"
        color="white"
        placeholder="Background Color"
        type="color"
        v-model="config.bgColor"
        :ui="{
          base: 'w-10 h-10 cursor-pointer',
          padding: { lg: 'py-0 px-1' },
          rounded: 'rounded-full',
        }"
      />
    </UFormGroup>
    <GeneratorGradientSelection
      v-else-if="config.backgroundType === BACKGROUND_TYPE_GRADIENT"
      @gradient="gradientUpdated"
    />
    <GeneratorImageSelection
      v-else-if="config.backgroundType === BACKGROUND_TYPE_IMAGE"
      @imageSelected="config.bgImage = $event"
    />
    <GeneratorSocialMedia @platform="platformUpdated" />
  </div>
</template>
<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import {
  BACKGROUND_TYPES,
  BACKGROUND_TYPE_COLOR,
  BACKGROUND_TYPE_GRADIENT,
  BACKGROUND_TYPE_IMAGE,
} from "~/constants/index";
import { watchDeep } from "@vueuse/core";
import { SOCIAL_MEDIA_IMAGE_SIZES } from "~/constants/image";

const config = ref({
  title: "Let the fun begin!",
  description:
    "It's time to let loose and have some fun! Whether it's a wild party, a laid-back get-together, or a solo dance party in your living room, it's all about embracing the moment and making some unforgettable memories. So grab a drink, put on your dancing shoes, and let the good times roll!",
  backgroundType: "color",
  textColor: "#ffffff",
  bgColor: "#184e77",
  gradient: "linear-gradient(#0123de, #fc026c, #1ee103)",
  bgImage: "",
  platform: "",
  bgMask: {
    blur: '',
    color: ''
  }
});

const { updateConfig }: any = useCounterStore();

const platformUpdated = (platform: string) => {
  config.value.platform = platform;
};

const gradientUpdated = (gradient: any) => {
  config.value.gradient = gradient;
};

const getPostStyle = (postData: any) => {
  if (postData.backgroundType === "color") {
    return {
      "background-color": postData.bgColor,
      color: postData.textColor,
    };
  } else if (postData.backgroundType === "gradient") {
    return {
      background: postData.gradient,
      color: postData.textColor,
    };
  } else {
    return {
      "background-image": `url(${postData.bgImage})`,
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "center",
    };
  }
};

const getImageTypes = (postSpecs: any) => {
  const selectedOption: string = postSpecs.platform;
  const aspectRatios = SOCIAL_MEDIA_IMAGE_SIZES[selectedOption];
  return Object.keys(aspectRatios).map((val) => {
    return {
      label: val.replaceAll("_", " "),
      value: val,
    };
  });
};

const updateConfigStore = useDebounceFn((obj) => {
  const imageTypes = getImageTypes(obj);
  const postStyle = getPostStyle(obj);
  const payload = {
    ...obj,
    availableImageTypes: imageTypes,
    bgStyle: postStyle,
  };
  updateConfig(payload);
}, 1000)

watchDeep(config, (obj) => {
  updateConfigStore(obj)
});
</script>
<style>
.background-type fieldset div {
  @apply mb-1;
}
</style>
