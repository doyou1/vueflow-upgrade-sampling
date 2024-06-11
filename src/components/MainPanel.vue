<template>
  <vue-flow
    :nodes="nodes"
    @node-drag-stop="
      $emit('nodeDragStop', $event.node.id, $event.node.position)
    "
  >
    <template #node-sql="slotProps">
      <sql-node v-bind="slotProps" />
    </template>
    <template #node-select="slotProps">
      <select-node v-bind="slotProps" />
    </template>
    <template #node-group_by="slotProps">
      <group-by-node v-bind="slotProps" />
    </template>
    <template #node-join="slotProps">
      <join-node v-bind="slotProps" />
    </template>
    <template #node-filter="slotProps">
      <filter-node v-bind="slotProps" />
    </template>
    <template #node-data_source="slotProps">
      <data-source-node v-bind="slotProps" />
    </template>
    <template #node-dataset="slotProps">
      <dataset-node v-bind="slotProps" />
    </template>
  </vue-flow>
</template>

<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import { Node, XYPosition } from "../composables/use-vueflow-controller";
import SqlNode from "@/components/nodes/SqlNode.vue";
import SelectNode from "@/components/nodes/SelectNode.vue";
import GroupByNode from "@/components/nodes/GroupByNode.vue";
import JoinNode from "@/components/nodes/JoinNode.vue";
import FilterNode from "@/components/nodes/FilterNode.vue";
import DataSourceNode from "@/components/nodes/DataSourceNode.vue";
import DatasetNode from "@/components/nodes/DatasetNode.vue";
defineProps<{
  nodes: Array<Node>;
}>();

defineEmits<{
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
}>();
</script>

<style scoped lang="scss"></style>
