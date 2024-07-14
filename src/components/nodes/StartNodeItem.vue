<template>
  <base-node :visible-source-handle="false">
    <template #icon>
      <icon-start />
    </template>
    <template #name>{{ name }}</template>
  </base-node>
</template>

<script setup lang="ts">
import BaseNode from "@/components/commons/BaseNode.vue";
import IconStart from "@/components/commons/icons/IconStart.vue";
defineProps<{
  name: string;
}>();

defineEmits<{
  // (e: "add:childNode", type: string): void;
}>();
</script>

<style scoped lang="scss"></style>
