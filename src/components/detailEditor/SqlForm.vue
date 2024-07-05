<template>
  <div class="sql-form">
    <el-form-item label="Name">
      <el-input v-model="innerFormData.name" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import {
  type SqlNodeData,
  type SqlNodeFormData,
} from "@/composables/use-vueflow-controller";
import { ref, watch } from "vue";
import {
  ElFormItem,
} from "element-plus";
const props = defineProps<{
  data: SqlNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", value: SqlNodeData): void;
}>();

const innerFormData = ref<SqlNodeFormData>(props.data.formData);

watch(
  innerFormData,
  () => {
    emits("update:data", { ...props.data, formData: innerFormData.value });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
