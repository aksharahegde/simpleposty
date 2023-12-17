<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col gap-4 justify-center my-2">
      <div class="flex justify-end">
        <UButton
          @click="download"
          color="white"
          icon="i-solar-download-minimalistic-line-duotone"
          :disabled="!postConfig"
          >Download</UButton
        >
      </div>
      <div class="flex justify-around flex-wrap w-full gap-2">
        <span
          v-for="item in postConfig.availableImageTypes"
          :key="item"
          :class="{
            'bg-gray-600 text-white': selectedImageType === item.value,
          }"
          class="cursor-pointer text-center capitalize flex-1 text-sm border whitespace-nowrap border-gray-600 rounded-md px-3 py-1"
          @click="selectImageType(item)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    <div class="h-[500px] w-full">
      <div
        v-if="postConfig"
        id="post-preview"
        class="shadow-lg relative overflow-hidden h-full"
        :style="previewStyle"
      >
        <div
          class="px-6 py-4 absolute inset-0 bg-transparent"
          :style="{ color: postConfig.textColor || '#ffffff' }"
        >
          <h2 class="mb-2 font-bold" :style="fontSize.heading">
            {{ postConfig.title }}
          </h2>
          <p
            class="font-normal leading-relaxed mt-5"
            :style="fontSize.paragraph"
          >
            {{ postConfig.description }}
          </p>
        </div>
        <div
          v-if="postConfig.avatar && postConfig.avatar.show"
          class="rounded-full flex px-3 py-2 absolute bottom-2 items-center gap-2 right-2 shadow-lg bg-gray-800/50 backdrop-blur"
        >
          <UAvatar
            :src="postConfig.avatar.avatar"
            :alt="postConfig.avatar.name"
            size="xl"
          />
          <div class="text-white flex-col flex max-w-xs truncate">
            <span>{{ postConfig.avatar.name }}</span>
            <span class="text-sm">{{ postConfig.avatar.username }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import { domToPng } from "modern-screenshot";
import { SOCIAL_MEDIA_IMAGE_SIZES } from "~/constants/image";

const { postConfig } = useCounterStore() as any;

const showPreview = ref(false);
const selectedImageType = ref("");
const selectedPlatform = ref("");
const previewDivSize = ref({
  width: 800,
  height: 500,
});

const previewStyle = ref({});
const fontSize = ref({
  heading: {
    fontSize: "38px",
  },
  paragraph: {
    fontSize: "25px",
  },
});

onMounted(() => {
  const previewDiv = document.querySelector("#post-preview") as any;
  if (previewDiv) {
    previewDivSize.value = {
      width: previewDiv.offsetWidth,
      height: previewDiv.offsetHeight,
    };
  }
});

watchDeep(postConfig, (obj: any) => {
  showPreview.value = false;
  setTimeout(() => {
    showPreview.value = true;
    if (
      obj.platform !== selectedPlatform.value &&
      selectedImageType.value !== obj.availableImageTypes[0].value
    ) {
      selectedImageType.value = obj.availableImageTypes[0].value;
      selectedPlatform.value = obj.platform;
    }
    setPreviewSize(obj);
  }, 300);
});

const selectImageType = (item: any) => {
  selectedImageType.value = item.value;
  setPreviewSize(postConfig);
};

const setPreviewSize = (obj: any) => {
  showPreview.value = true;
  const postSize = getImageOptions(obj.platform);
  fontSize.value = {
    heading: {
      fontSize: `${obj.fontSize}px`,
    },
    paragraph: {
      fontSize: `${obj.fontSize / 1.5}px`,
    },
  };
  previewStyle.value = {
    ...postConfig.value.bgStyle,
  };
};

const getImageOptions = (platform: string) => {
  return SOCIAL_MEDIA_IMAGE_SIZES[platform || "x"][selectedImageType.value];
};

const getFilename = () => {
  return `${postConfig.value.platform}_${selectedImageType.value}.png`;
};

const download = () => {
  domToPng(
    document.querySelector("#post-preview") as any,
    getImageOptions(postConfig.value.platform)
  ).then((dataUrl) => {
    const link = document.createElement("a");
    link.download = getFilename();
    link.href = dataUrl;
    link.click();
    link.remove();
  });
};
</script>
