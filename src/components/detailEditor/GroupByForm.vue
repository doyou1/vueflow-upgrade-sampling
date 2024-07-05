<template>
  <div class="group-by-form">
    <el-form-item label="Name">
      <el-input v-model="innerFormData.name" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import {
  type GroupByNodeData,
  type GroupByNodeFormData,
} from "@/composables/use-vueflow-controller";
import { ref, watch } from "vue";
import {
  ElFormItem,
} from "element-plus";
const props = defineProps<{
  data: GroupByNodeData;
}>();

const emits = defineEmits<{
  (e: "update:data", value: GroupByNodeData): void;
}>();

const innerFormData = ref<GroupByNodeFormData>(props.data.formData);

watch(
  innerFormData,
  () => {
    emits("update:data", { ...props.data, formData: innerFormData.value });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss"></style>
