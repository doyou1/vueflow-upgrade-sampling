<template>
  <div class="data-source-form">
  </div>
</template>

<script setup lang="ts">
import {
  type DataSourceNodeData,
  type DataSourceNodeFormData,
} from "@/composables/use-vueflow-controller";
import { ref, watch } from "vue";
const props = defineProps<{
  data: DataSourceNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", value: DataSourceNodeData): void;
}>();

const innerFormData = ref<DataSourceNodeFormData>(props.data.formData);

watch(
  innerFormData,
  () => {
    emits("update:data", { ...props.data, formData: innerFormData.value });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
