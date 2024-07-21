<template>
  <base-node
    :visible-target-handle="false"
    @click:node="$emit('click:node')"
    @add:parent-node="$emit('add:parentNode', $event)"
    @add:child-node="$emit('add:childNode', $event)"
    @click:node-menu="$emit('click:nodeMenu', $event)"
  >
    <template #icon>
      <icon-dataset />
    </template>
    <template #name>{{ name }}</template>
  </base-node>
</template>

<script setup lang="ts">
import BaseNode from "@/components/commons/BaseNode.vue";
import IconDataset from "@/components/commons/icons/IconDataset.vue";
defineProps<{
  name: string;
}>();

defineEmits<{
  (e: "click:node"): void;
  (e: "add:parentNode", type: string): void;
  (e: "add:childNode", type: string): void;
  (e: "click:nodeMenu", menuType: string): void;
}>();
</script>
