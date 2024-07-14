<template>
  <vue-flow
    ref="vueFlowRef"
    :nodes="nodes"
    :edges="edges"
    @node-drag-stop="
      $emit('nodeDragStop', $event.node.id, $event.node.position)
    "
    @connect="$emit('add:edge', $event)"
    @nodes-change="onNodesChange"
    @edges-change="onEdgesChange"
  >
    <controller-panel @zoom-in="onZoomIn" @zoom-out="onZoomOut" />
    <template #node-start="{ id, data }">
      <start-node
        :name="data.formData.name"
        @click:node="handleClickNode(id)"
        @add:child-node="handleAddChildNode($event, id)"
        @click:node-menu="handleClickNodeMenu(id, $event)"
      />
    </template>
    <template #node-sql="{ id, data }">
      <sql-node
        :name="data.formData.name"
        @click:node="handleClickNode(id)"
        @add:parent-node="handleAddParentNode($event, id)"
        @add:child-node="handleAddChildNode($event, id)"
        @click:node-menu="handleClickNodeMenu(id, $event)"
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
    <detail-editor-panel v-if="detailEditorTargetNode" :target-node="detailEditorTargetNode" @close="$emit('update:detailEditorTargetNode', undefined)"/>
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
  Connection,
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
  detailEditorTargetNode: Node | undefined;
}>();

const emits = defineEmits<{
  (e: "update:panelDimensions", value: Dimensions): void;
  (e: "initialized"): void;
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
  (e: "remove:nodes", removeNodeIds: Array<string>): void;
  (e: "add:edge", value: Connection): void;
  (e: "remove:edges", removeEdgeIds: Array<string>): void;
  (e: "add:parentNode", type: string, childNodeId: string): void;
  (e: "add:childNode", type: string, parentNodeId: string): void;
  (e: "click:nodeMenu", nodeId: string, menuType: string): void;
  (e: "update:detailEditorTargetNode", value: Node | undefined): void;
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

const handleClickNode = (nodeId: string) => {
  const node = props.nodes.find((v) => v.id === nodeId);
  if (node) {
    emits("update:detailEditorTargetNode", node);
  }
};

const handleAddParentNode = (type: string, childNodeId: string) => {
  emits("add:parentNode", type, childNodeId);
};

const handleAddChildNode = (type: string, parentNodeId: string) => {
  emits("add:childNode", type, parentNodeId);
};

const handleClickNodeMenu = (nodeId: string, menuType: string) => {
  emits("click:nodeMenu", nodeId, menuType);
};
</script>

<style scoped lang="scss"></style>
