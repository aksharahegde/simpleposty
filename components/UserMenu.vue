<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

console.log(user.value);

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

const items = [
  [
    {
      label: user.value?.email,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-solar-settings-bold",
    },
  ],
  [
    {
      label: "Whats new?",
      icon: "i-solar-stars-minimalistic-bold-duotone",
      disabled: true,
    },
    {
      label: "Github",
      icon: "i-simple-icons-github",
      href: "https://github.com/aksharahegde",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: signOut,
    },
  ],
];
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar :src="user.user_metadata.picture" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
