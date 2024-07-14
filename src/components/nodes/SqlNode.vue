<template>
  <base-node
    @click:node="$emit('click:node')"
    @add:parent-node="$emit('add:parentNode', $event)"
    @add:child-node="$emit('add:childNode', $event)"
  >
    <template #icon>
      <icon-sql />
    </template>
    <template #name>{{ name }}</template>
  </base-node>
</template>

<script setup lang="ts">
import BaseNode from "@/components/commons/BaseNode.vue";
import IconSql from "@/components/commons/icons/IconSql.vue";
defineProps<{
  name: string;
}>();

defineEmits<{
  (e: "click:node"): void;
  (e: "add:parentNode", type: string): void;
  (e: "add:childNode", type: string): void;
}>();
</script>
