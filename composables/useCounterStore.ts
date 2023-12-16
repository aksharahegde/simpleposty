import { computed, ref } from "vue";
import { createInjectionState } from "@vueuse/shared";

const [useProvideCounterStore, useCounterStore] = createInjectionState(
  (initialValue: any) => {
    const config = ref(initialValue);
    const postConfig = computed(() => config.value);
    function updateConfig(val: any) {
      config.value = val;
    }
    return { config, postConfig, updateConfig };
  }
);
export { useProvideCounterStore, useCounterStore };
