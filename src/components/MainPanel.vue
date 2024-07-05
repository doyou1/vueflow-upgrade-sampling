<template>
  <vue-flow
    ref="vueFlowRef"
    :nodes="nodes"
    :edges="edges"
    @node-drag-stop="
      $emit('nodeDragStop', $event.node.id, $event.node.position)
    "
    @dragover="$emit('dragOver', $event)"
    @dragleave="$emit('dragLeave', $event)"
    @connect="$emit('addEdge', $event)"
    @nodes-change="onNodesChange"
    @edges-change="onEdgesChange"
  >
    <template #node-sql="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-select="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-group_by="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-join="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-filter="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-data_source="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        hide-top-handle
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
    <template #node-dataset="{ id, type, data }">
      <node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        hide-bottom-handle
        @dblclick="$emit('click:menu', 'detail', id)"
        @click:menu="$emit('click:menu', $event, id)"
      />
    </template>
  </vue-flow>
</template>

<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import {
  Node,
  Edge,
  XYPosition,
  Dimensions,
  Connection,
  NodeChange,
  EdgeChange,
  MenuType,
} from "@/composables/use-vueflow-controller";
import NodeItem from "@/components/nodes/NodeItem.vue";
import { ref, watch } from "vue";
defineProps<{
  nodes: Array<Node>;
  edges: Array<Edge>;
  panelDimensions: Dimensions;
}>();

const emits = defineEmits<{
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
  (e: "dragOver", event: DragEvent): void;
  (e: "dragLeave", event: DragEvent): void;
  (e: "update:panelDimensions", value: Dimensions): void;
  (e: "initialized"): void;
  (e: "addEdge", value: Connection): void;
  (e: "remove:nodes", removeNodeIds: Array<string>): void;
  (e: "remove:edges", removeEdgeIds: Array<string>): void;
  (e: "click:menu", menu: MenuType, nodeId: string): void;
}>();

const vueFlowRef = ref<InstanceType<typeof VueFlow>>();

watch(vueFlowRef, () => {
  if (vueFlowRef.value) {
    emits("update:panelDimensions", vueFlowRef.value.dimensions);
    emits("initialized");
  }
});

const onNodesChange = (values: Array<NodeChange>) => {
  const removeNodeIds = values
    .filter((value) => value.type === "remove")
    .map((value) => value.id);
  if (removeNodeIds.length > 0) {
    emits("remove:nodes", removeNodeIds);
  }
};
const onEdgesChange = (values: Array<EdgeChange>) => {
  const removeEdgeIds = values
    .filter((value) => value.type === "remove")
    .map((value) => value.id);
  if (removeEdgeIds.length > 0) {
    emits("remove:edges", removeEdgeIds);
  }
};
</script>

<style scoped lang="scss"></style>
