<template>
  <div class="sidebar-container">
    <div v-for="node in nodes" :key="node.id">
      <node-item
        :id="node.id"
        :type="node.type"
        :name="node.data?.name ?? ''"
        view-type="sidebar"
        :draggable="true"
        @dragstart="$emit('dragStart', $event, node.type)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NodeItem from "@/components/nodes/NodeItem.vue";
import { computed } from "vue";
import { InnerNode, NodeType } from "@/composables/use-vueflow-controller";

defineEmits<{
  (e: "dragStart", event: DragEvent, type: NodeType): void;
}>()

const nodes = computed<Array<InnerNode>>(() => [
  {
    id: "1",
    type: "sql",
    data: {
      name: "SQL",
      value: "",
    },
  },
  {
    id: "2",
    type: "select",
    data: {
      name: "SELECT",
      value: "",
      options: [
        {
          value: "1",
          label: "label1",
        },
        {
          value: "2",
          label: "label2",
        },
        {
          value: "3",
          label: "label3",
        },
      ],
    },
  },
  {
    id: "3",
    type: "group_by",
    data: {
      name: "GROUPBY",
    },
  },
  {
    id: "4",
    type: "join",
    data: {
      name: "JOIN",
    },
  },
  {
    id: "5",
    type: "filter",
    data: {
      name: "FILTER",
    },
  },
  {
    id: "6",
    type: "data_source",
    data: {
      name: "DATASOURCE",
    },
  },
]);
</script>

<style scoped lang="scss">
.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
