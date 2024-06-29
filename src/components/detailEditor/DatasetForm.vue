<template>
  <div class="dataset-form">
    <el-input v-model="innerData.name" />
  </div>
</template>

<script setup lang="ts">
import { type DatasetNodeData } from "@/composables/use-vueflow-controller";
import { ref, watch } from "vue";
import { ElInput } from "element-plus";
const props = defineProps<{
  data: DatasetNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", data: DatasetNodeData): void;
}>();

const innerData = ref<DatasetNodeData>(props.data);

watch(
  innerData,
  () => {
    emits("update:data", innerData.value);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
