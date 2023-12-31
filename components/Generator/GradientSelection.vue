<template>
  <div class="space-y-4 flex flex-col p-3 border border-gray-600 rounded-md">
    <USelect
      v-model="gradientType"
      :options="GRADIENT_TYPES"
      class="w-1/2"
      label="Gradient Type"
      @change="geadientTypeChanged"
    />
    <div class="flex w-full gap-4 items-center">
      <UButton @click="generateGradient">Random</UButton>
      <UDivider label="OR" :ui="{ label: 'text-xs' }" orientation="vertical" />
      <div class="flex w-3/4 justify-evenly gap-2">
        <UFormGroup label="From">
          <UInput
            size="lg"
            color="white"
            type="color"
            v-model="config.from"
            :ui="{
              base: 'w-10 h-10 cursor-pointer',
              padding: { lg: 'py-0 px-1' },
              rounded: 'rounded-full',
            }"
          />
        </UFormGroup>
        <UFormGroup label="Via">
          <UInput
            size="lg"
            color="white"
            type="color"
            v-model="config.via"
            :ui="{
              base: 'w-10 h-10 cursor-pointer',
              padding: { lg: 'py-0 px-1' },
              rounded: 'rounded-full',
            }"
          />
        </UFormGroup>
        <UFormGroup label="To">
          <UInput
            size="lg"
            color="white"
            type="color"
            v-model="config.to"
            :ui="{
              base: 'w-10 h-10 cursor-pointer',
              padding: { lg: 'py-0 px-1' },
              rounded: 'rounded-full',
            }"
          />
        </UFormGroup>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchDeep } from "@vueuse/core";
import { GRADIENT_TYPES } from "~/constants/image";

const emit = defineEmits(["gradient"]);
const config = ref({
  from: "#0123de",
  via: "#fc026c",
  to: "#1ee103",
});

const gradientType = ref("linear");

const generateGradientString = (gradientType: any, gradientObject: any) => {
  const { from, via, to } = gradientObject;

  if (!from || !to) {
    console.error("Invalid gradient object provided");
    return;
  }

  if (gradientType === "linear") {
    const orientation = useRandomDegree();
    if (via) {
      return `linear-gradient(${orientation}deg, ${from} 0%, ${via} 50%, ${to} 100%)`;
    } else {
      return `linear-gradient(${orientation}deg, ${from} 0%, ${to} 100%)`;
    }
  } else if (gradientType === "radial") {
    if (via) {
      return `radial-gradient(circle, ${from} 0%, ${via} 50%, ${to} 100%)`;
    } else {
      return `radial-gradient(circle, ${from} 0%, ${to} 100%)`;
    }
  } else if (gradientType === "conic") {
    if (via) {
      return `conic-gradient(from 180deg at 50% 50%, ${from} 0%, ${via} 50%, ${to} 100%)`;
    } else {
      return `conic-gradient(from 180deg at 50% 50%, ${from} 0%, ${to} 100%)`;
    }
  } else {
    console.error("Invalid gradient type provided");
    return;
  }
};

const geadientTypeChanged = () => {
  emit("gradient", generateGradientString(gradientType.value, config.value));
};

const generateGradient = () => {
  const steps = useRandomValue([2, 3]);
  config.value = useRandomGradient(steps);
};

watchDeep(config, (obj) => {
  const gradient = generateGradientString(gradientType.value, obj);
  emit("gradient", gradient);
});
</script>
