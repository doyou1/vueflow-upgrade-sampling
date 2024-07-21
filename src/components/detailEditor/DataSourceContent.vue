<template>
  <div>{{ node.data?.formData }}</div>
</template>

<script setup lang="ts">
import { DataSourceNode } from "@/composables/use-vueflow-controller";
defineProps<{
  node: DataSourceNode;
}>();

//   const emits = defineEmits<{  }>();
</script>

<style scoped lang="scss"></style>
