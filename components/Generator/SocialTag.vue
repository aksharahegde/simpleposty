<template>
  <div class="p-3 flex flex-col rounded-md gap-4 bg-gray-100 dark:bg-gray-900">
    <UFormGroup label="Show Badge" class="w-full flex justify-between">
      <UToggle v-model="avatarConfig.show" />
    </UFormGroup>
    <div v-if="avatarConfig.show" class="flex gap-2">
      <GeneratorFileUpload
        id="avatar-upload"
        :custom-classes="'w-16 h-16 rounded-full'"
        :show-label="false"
        @url="avatarConfig.avatar = $event"
      />
      <div class="flex flex-col gap-2">
        <UInput
          size="lg"
          color="white"
          v-model="avatarConfig.name"
          placeholder="Name"
        />
        <UInput
          size="lg"
          color="white"
          placeholder="@username"
          v-model="avatarConfig.username"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchDeep } from "@vueuse/core";

const user: any = useSupabaseUser();

const emit = defineEmits(["updated"]);
const avatarConfig = ref({
  show: true,
  avatar: "",
  name: user.value?.user_metadata.name,
  username: user.value?.user_metadata.email,
  background: "#000000",
});

watchDeep(avatarConfig, (obj) => {
  emit("updated", obj);
});
</script>
