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
      <div
        v-if="!post_settings || !post_settings.length"
        class="mx-auto w-full max-w-7xl px-5 py-16"
      >
        <div
          class="flex w-full flex-col items-center px-6 py-16 text-center text-white"
        >
          <h2
            class="mb-6 flex-col text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12"
          >
            No saved settings.
          </h2>
          <div class="mx-auto">
            <ul
              class="mb-6 flex flex-col flex-nowrap gap-3 md:mb-10 md:flex-row lg:mb-12"
            >
              <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
                <Icon
                  name="carbon:color-palette"
                  class="mr-2 inline-block h-4 w-4"
                />
                <p class="">Color</p>
              </li>
              <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
                <Icon
                  name="carbon:gradient"
                  class="mr-2 inline-block h-4 w-4"
                />
                <p class="">Gradient</p>
              </li>
              <li class="ml-2 mr-2 flex flex-row items-center md:mx-4">
                <Icon name="carbon:image" class="mr-2 inline-block h-4 w-4" />
                <p class="">
                  Image <span class="text-gray-500">(coming soon)</span>
                </p>
              </li>
            </ul>
          </div>
          <UButton
            color="black"
            variant="solid"
            size="lg"
            icon="i-solar-add-circle-outline"
            label="Get started"
            @click.stop="close"
          />
        </div>
      </div>
      <div v-else class="grid grid-cols-3 gap-4">
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
            class="h-20"
            :style="{
              background:
                post_setting.config.backgroundType === 'color'
                  ? post_setting.config.bgColor
                  : post_setting.config.gradient,
            }"
          />
        </UCard>
      </div>
    </UCard>
  </UModal>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
  },
});
const emit = defineEmits(["close"]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const isModalOpen = ref(false);
const deleting = ref(false);

onBeforeMount(() => {
  isModalOpen.value = props.isOpen;
});

const post_settings = ref([]);

const { data, error } = await supabase
  .from("post_settings")
  .select("*")
  .eq("user_id", user.value?.id);

post_settings.value = data;

const deletePostSetting = async (id) => {
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
