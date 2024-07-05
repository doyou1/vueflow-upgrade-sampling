<template>
  <div class="select-form">
    <el-form-item label="Name">
      <el-input v-model="innerFormData.name" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import {
  type SelectNodeData,
  type SelectNodeFormData,
} from "@/composables/use-vueflow-controller";
import { ref, watch } from "vue";
import {
  ElFormItem,
} from "element-plus";
const props = defineProps<{
  data: SelectNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", value: SelectNodeData): void;
}>();

const innerFormData = ref<SelectNodeFormData>(props.data.formData);

watch(
  innerFormData,
  () => {
    emits("update:data", { ...props.data, formData: innerFormData.value });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
