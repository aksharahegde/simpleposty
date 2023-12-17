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
    <div class="flex justify-between items-center">
      <h2 class="text-lg text-gray-700 font-semibold dark:text-gray-300">
        Customization
      </h2>
      <UButton
        v-if="user"
        color="white"
        variant="solid"
        label="Save"
        icon="i-solar-file-outline"
        :disabled="isSavingSettings"
        @click.stop="saveSettings"
      />
    </div>
    <div class="flex items-center">
      <UFormGroup label="Text Color" class="w-1/3">
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
      <UFormGroup label="Font size" class="w-2/3">
        <URange color="primary" v-model="config.fontSize" />
      </UFormGroup>
    </div>
    <div
      class="p-3 flex flex-col rounded-md gap-4 bg-gray-100 dark:bg-gray-900"
    >
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
    </div>
    <GeneratorSocialMedia @platform="platformUpdated" />
    <GeneratorSocialTag @updated="socialBadgeUpdated" />
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

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const { updateConfig }: any = useCounterStore();
const isSavingSettings = ref(false);

const config = ref({
  title: "Let the fun begin!",
  description:
    "It's time to let loose and have some fun! Whether it's a wild party, a laid-back get-together, or a solo dance party in your living room, it's all about embracing the moment and making some unforgettable memories. So grab a drink, put on your dancing shoes, and let the good times roll!",
  backgroundType: "color",
  textColor: "#ffffff",
  fontSize: 38,
  bgColor: "#184e77",
  gradient: "linear-gradient(#0123de, #fc026c, #1ee103)",
  bgImage: "",
  platform: "",
  bgMask: {
    blur: "",
    color: "",
  },
  avatar: {
    show: true,
    name: user.value?.user_metadata.name,
    username: user.value?.user_metadata.email,
    avatar: "",
  },
});

const platformUpdated = (platform: string) => {
  config.value.platform = platform;
};

const gradientUpdated = (gradient: any) => {
  config.value.gradient = gradient;
};

const socialBadgeUpdated = (badge: any) => {
  config.value.avatar = badge;
};

const updateConfigStore = useDebounceFn(async (obj) => {
  const imageTypes = useImageTypes(obj);
  const postStyle = await usePostStyle(obj);
  const payload = {
    ...obj,
    availableImageTypes: imageTypes,
    bgStyle: postStyle,
  };
  updateConfig(payload);
}, 300);

watchDeep(config, (obj) => {
  updateConfigStore(obj);
});

const saveSettings = async () => {
  isSavingSettings.value = true;
  const { data, error } = await supabase
    .from("post_settings")
    .insert({
      label: useLabel(user.value?.email as any),
      config: config.value,
      created_at: new Date(),
      user_id: user.value?.id,
    } as any)
    .select();
  isSavingSettings.value = false;

  if (error) {
    toast.add({
      title: "Faile to save",
      description: "Please try again",
      icon: "i-solar-warning-circle-line-duotone",
      color: "red",
    });
  } else {
    toast.add({
      title: "Settings saved",
      description: "Your settings have been saved",
      icon: "i-solar-check-circle-line-duotone",
      color: "green",
    });
  }
};
</script>
<style>
.background-type fieldset div {
  @apply mb-1 inline mx-2;
}
</style>
