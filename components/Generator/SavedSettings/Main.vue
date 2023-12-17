<template>
  <UModal
    v-model="isModalOpen"
    @close="close"
    :ui="{ width: 'w-full sm:max-w-6xl' }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg text-gray-700 font-semibold dark:text-gray-300">
            Saved Settings
          </h2>
          <UButton
            color="white"
            variant="ghost"
            size="lg"
            icon="i-solar-close-circle-outline"
            @click.stop="close"
          />
        </div>
      </template>
      <GeneratorSavedSettingsNoData
        v-if="!isLoading && (!post_settings || !post_settings.length)"
        @close="close"
      />
      <div v-else class="grid grid-cols-3 gap-4">
        <GeneratorSavedSettingsShimmer v-if="isLoading" />
        <UCard
          v-for="post_setting in post_settings"
          :key="post_setting.id"
          :ui="{
            header: {
              padding: 'px-4 py-2 sm:px-6',
            },
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h2
                class="text-gray-600 font-semibold text-sm dark:text-gray-400"
              >
                {{ post_setting.label }}
              </h2>
              <UButton
                color="black"
                variant="soft"
                size="lg"
                icon="i-solar-trash-bin-minimalistic-2-outline"
                :disabled="deleting"
                @click.stop="deletePostSetting(post_setting.id)"
              />
            </div>
          </template>
          <div
            class="h-20 cursor-pointer"
            :style="{
              background:
                post_setting.config.backgroundType === 'color'
                  ? post_setting.config.bgColor
                  : post_setting.config.gradient,
            }"
            @click="applySetting(post_setting)"
          />
        </UCard>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});
const emit = defineEmits(["close"]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const { updateConfig }: any = useCounterStore();

const isModalOpen = ref(false);
const deleting = ref(false);
const isLoading = ref(false);
const post_settings: Ref<any[]> = ref([]);

onBeforeMount(() => {
  isModalOpen.value = props.isOpen;
});

onMounted(async () => {
  isLoading.value = true;
  const { data, error } = await supabase
    .from("post_settings")
    .select("*")
    .eq("user_id", user?.value?.id as string);
  post_settings.value = data as any[];
  isLoading.value = false;
});

const applySetting = async (obj: any) => {
  const imageTypes = useImageTypes(obj.config);
  const postStyle = await usePostStyle(obj.config);
  const payload = {
    ...obj.config,
    availableImageTypes: imageTypes,
    bgStyle: postStyle,
  };
  updateConfig(payload);
  close();
};

const deletePostSetting = async (id: string) => {
  deleting.value = true;
  const { error } = await supabase.from("post_settings").delete().eq("id", id);
  deleting.value = false;
  if (error) {
    toast.add({
      title: "Failed to delete",
      description: error.message,
      icon: "i-solar-warning-circle-line-duotone",
      color: "red",
    });
  } else {
    toast.add({
      title: "Deleted successfully",
      description: "Selected setting has been deleted",
      icon: "i-solar-check-circle-line-duotone",
      color: "green",
    });
    const deletdIndex = post_settings.value.findIndex(
      (setting) => setting.id === id
    );
    post_settings.value.splice(deletdIndex, 1);
  }
};
const close = () => {
  emit("close");
};
</script>
