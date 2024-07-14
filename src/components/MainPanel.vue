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
    <template #node-start="{ id, data }">
      <start-node
        :name="data.formData.name"
        @click:node="handleClickNode(id)"
        @add:child-node="$emit('add:childNode',$event, id)"
      />
    </template>
    <template #node-sql="{ id, data }">
      <sql-node
        :name="data.formData.name"
        @click:node="handleClickNode(id)"
        @add:parent-node="$emit('add:parentNode',$event, id)"
        @add:child-node="$emit('add:childNode',$event, id)"
      />
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

    <detail-editor-panel v-if="targetNode" :target-node="targetNode" @close="targetNode = undefined;"/>
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
import StartNode from "@/components/nodes/StartNode.vue";
import SqlNode from "@/components/nodes/SqlNode.vue";
import ControllerPanel from "@/components/mainPanel/ControllerPanel.vue";
import DetailEditorPanel from "@/components/mainPanel/DetailEditorPanel.vue";
import { ref, watch } from "vue";
const props = defineProps<{
  nodes: Array<Node>;
  edges: Array<Edge>;
  panelDimensions: Dimensions;
}>();

const emits = defineEmits<{
  (e: "update:panelDimensions", value: Dimensions): void;
  (e: "initialized"): void;
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
  (e: "remove:nodes", removeNodeIds: Array<string>): void;
  (e: "remove:edges", removeEdgeIds: Array<string>): void;
  (e: "add:parentNode", type: string, childNodeId: string): void;
  (e: "add:childNode", type: string, parentNodeId: string): void;
}>();

const vueFlowRef = ref<InstanceType<typeof VueFlow>>();

watch(vueFlowRef, () => {
  if (vueFlowRef.value) {
    emits("update:panelDimensions", vueFlowRef.value.dimensions);
    if (vueFlowRef.value.dimensions.height > 500) emits("initialized");
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

const targetNode = ref<Node | undefined>(undefined);
const handleClickNode = (nodeId: string) => {
  const node = props.nodes.find((v) => v.id === nodeId);
  if (node) {
    targetNode.value = node;
  }
}
</script>

<style scoped lang="scss"></style>
