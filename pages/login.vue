<template>
  <div class="relative min-h-screen bg-red-50 dark:bg-gray-900">
    <Icon
      name="i-solar-notes-minimalistic-bold-duotone"
      class="absolute top-2 right-2 opacity-5 text-gray-400 text-[55rem]"
    />

    <Icon
      name="solar:notes-minimalistic-bold-duotone"
      class="absolute top-2 left-2 opacity-5 text-gray-400 text-[55rem]"
    />

    <div class="px-4 py-16 w-full min-h-screen">
      <div class="flex flex-col justify-center items-start md:items-center">
        <Logo />
        <div
          class="relative p-4 mt-6 w-full bg-white rounded shadow dark:bg-gray-800 md:p-10 md:mt-16 lg:w-1/3 md:w-1/2 group"
        >
          <Icon
            name="solar:document-add-bold-duotone"
            class="absolute top-2 group-hover:rotate-12 transition-all duration-500 group-hover:text-primary-400 right-2 text-[12rem] opacity-10"
          />
          <p
            tabindex="0"
            role="heading"
            aria-label="Login to your account"
            class="text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300"
          >
            Login to your account
          </p>
          <p class="mt-4 text-sm font-medium leading-none text-gray-400">
            Dont have account? We will create one for you.
          </p>
          <div class="py-4">
            <UButton
              color="white"
              size="lg"
              class="mt-4"
              @click="initGoogleLogin"
            >
              <Icon name="logos:google-icon" />
              Continue with Google
            </UButton>

            <transition name="slide">
              <div v-if="showMessage" class="alert" :class="alertConfig.class">
                <Icon :name="alertConfig.icon" class="text-2xl" />
                <span>
                  {{ alertConfig.message }}
                </span>
              </div>
            </transition>
            <span class="hidden alert-error md:alert-success" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);
const showMessage = ref(false);

let alertConfig = {
  class: null,
  message: null,
  icon: "",
};

const initGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};
</script>
