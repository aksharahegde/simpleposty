<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col gap-4 justify-center my-2">
      <div class="flex justify-end">
        <UButton
          @click="download"
          color="white"
          icon="i-solar-download-minimalistic-line-duotone"
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
      <img :src="convertedPreview" oncontextmenu="return false" />
    </div>
    <div class="h-[500px] w-full hidden">
      <div
        v-if="postConfig && showPreview"
        id="post-preview"
        class="rounded-lg shadow-lg relative overflow-hidden"
        :style="previewStyle"
      >
        <div class="bg-gray-900 bg-opacity-90">
          <div
            class="px-6 py-4 absolute inset-0 bg-transparent"
            :style="{ color: postConfig.textColor || '#ffffff' }"
          >
            <h2 class="mb-2 font-bold" :style="fontSize.heading">
              {{ postConfig.title }}
            </h2>
            <p
              class="text-xl font-normal leading-relaxed mt-5"
              :style="fontSize.paragraph"
            >
              {{ postConfig.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import domtoimage from "dom-to-image";
import { SOCIAL_MEDIA_IMAGE_SIZES } from "~/constants/image";

const { postConfig } = useCounterStore() as any;

const convertedPreview = ref("");
const showPreview = ref(false);
watchDeep(postConfig, (obj) => {
  showPreview.value = false;
  setTimeout(() => {
    showPreview.value = true;
    if (
      postConfig.value.platform !== selectedPlatform.value &&
      selectedImageType.value !== postConfig.value.availableImageTypes[0].value
    ) {
      selectedImageType.value = postConfig.value.availableImageTypes[0].value;
      selectedPlatform.value = postConfig.value.platform;
    }
    setPreviewSize();
  }, 300);
});

const previewStyle = ref({});
const fontSize = ref({
  heading: {
    fontSize: "",
  },
  paragraph: {
    fontSize: "",
  },
});
const selectedImageType = ref("");
const selectedPlatform = ref("");
const selectImageType = (item: any) => {
  selectedImageType.value = item.value;
  setPreviewSize();
};

const setPreviewSize = () => {
  showPreview.value = true;
  const postSize = getImageOptions();
  fontSize.value = useFontSize(postSize);
  previewStyle.value = {
    ...postConfig.value.bgStyle,
    width: postSize.width,
    height: postSize.height,
  };
  setTimeout(() => {
    domtoimage
      .toPng(document.getElementById("post-preview") as any, getImageOptions())
      .then((dataUrl: any) => {
        convertedPreview.value = dataUrl;
      });
  });
};

const getImageOptions = () => {
  return SOCIAL_MEDIA_IMAGE_SIZES[postConfig.value.platform][
    selectedImageType.value
  ];
};

const getFilename = () => {
  return `${postConfig.value.platform}_${selectedImageType.value}.png`;
};

const download = () => {
  const element = document.getElementById("post-preview");
  if (element) {
    const link = document.createElement("a");
    link.download = getFilename();
    link.href = convertedPreview.value;
    link.click();
    link.remove();
  }
};

// const props = defineProps({
//   title: {
//     type: String,
//     default: "Sample Title",
//   },
//   description: {
//     type: String,
//     default: "Sample Description",
//   },
//   backgroundType: {
//     type: String,
//     default: "color",
//   },
//   gradient: {
//     type: Object,
//     default: () => ({
//       from: "",
//       via: "",
//       to: "",
//     }),
//   },
//   bgColor: {
//     type: String,
//   },
//   textColor: {
//     type: String,
//   },
//   photo: {
//     type: String,
//   },
//   border: {
//     type: Object,
//     default: () => ({
//       color: "",
//       width: "",
//       radius: "",
//     }),
//   },
//   shadow: {
//     type: String,
//   },
// });
// const { backgroundType, gradient, bgColor, textColor, photo, border, shadow } = props;
</script>
