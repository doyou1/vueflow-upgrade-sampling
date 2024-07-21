<template>
  <base-node
    :visible-source-handle="false"
    :visible-menu="false"
    :has-child-nodes="hasChildNodes"
    @click:node="$emit('click:node')"
    @add:child-node="$emit('add:childNode', $event)"
    @click:node-menu="$emit('click:nodeMenu', $event)"
  >
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
  hasChildNodes: boolean;
}>();

defineEmits<{
  (e: "click:node"): void;
  (e: "add:childNode", type: string): void;
  (e: "click:nodeMenu", menuType: string): void;
}>();
</script>
