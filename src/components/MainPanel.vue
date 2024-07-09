<template>
  <vue-flow
    ref="vueFlowRef"
    :nodes="nodes"
    :edges="edges"
    @node-drag-stop="
      $emit('nodeDragStop', $event.node.id, $event.node.position)
    "
    @nodes-change="onNodesChange"
    @edges-change="onEdgesChange"
  >
    <controller-panel @zoom-in="onZoomIn" @zoom-out="onZoomOut" />
    <template #node-start="{ id, type, data }">
      <start-node-item
        :id="id"
        :type="type"
        :name="data.formData.name"
        @add:child-node="$emit('add:childNode', $event, id)"
      />
    </template>
    <template #node-sql="{ type }">
      {{ type }}
    </template>
    <template #node-select="{ type }">
      {{ type }}
    </template>
    <template #node-group_by="{ type }">
      {{ type }}
    </template>
    <template #node-join="{ type }">
      {{ type }}
    </template>
    <template #node-filter="{ type }">
      {{ type }}
    </template>
    <template #node-data_source="{ type }">
      {{ type }}
    </template>
    <template #node-dataset="{ type }">
      {{ type }}
    </template>
  </vue-flow>
</template>

<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import {
  Node,
  Edge,
  Dimensions,
  NodeChange,
  EdgeChange,
  XYPosition,
} from "@/composables/use-vueflow-controller";
import StartNodeItem from "@/components/nodes/StartNodeItem.vue";
import ControllerPanel from "@/components/mainPanel/ControllerPanel.vue";
import { ref, watch } from "vue";
defineProps<{
  nodes: Array<Node>;
  edges: Array<Edge>;
  // canUndo: boolean;
  // canRedo: boolean;
  panelDimensions: Dimensions;
}>();

const emits = defineEmits<{
  (e: "update:panelDimensions", value: Dimensions): void;
  (e: "initialized"): void;
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
  (e: "remove:nodes", removeNodeIds: Array<string>): void;
  (e: "remove:edges", removeEdgeIds: Array<string>): void;
  (e: "add:childNode", type: string, source: string): void;
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

const onZoomIn = () => {
  if (vueFlowRef.value) {
    vueFlowRef.value.zoomIn();
  }
};

const onZoomOut = () => {
  if (vueFlowRef.value) {
    vueFlowRef.value.zoomOut();
  }
};
</script>

<style scoped lang="scss"></style>
