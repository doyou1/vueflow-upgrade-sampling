<template>
  <vue-flow
    ref="vueFlowRef"
    :nodes="nodes"
    @node-drag-stop="
      $emit('nodeDragStop', $event.node.id, $event.node.position)
    "
    @dragover="$emit('dragOver', $event)"
    @dragleave="$emit('dragLeave', $event)"
  >
    <template #node-sql="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-select="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-group_by="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-join="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-filter="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-data_source="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
    <template #node-dataset="{ id, type, data }">
      <node-item :id="id" :type="type" :name="data.name" />
    </template>
  </vue-flow>
</template>

<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import { Node, XYPosition, Dimensions } from "@/composables/use-vueflow-controller";
import NodeItem from "@/components/nodes/NodeItem.vue";
import { ref, computed, watch } from "vue";
defineProps<{
  nodes: Array<Node>;
  panelDimensions: Dimensions;
}>();

const emits = defineEmits<{
  (e: "nodeDragStop", nodeId: string, newPosition: XYPosition): void;
  (e: "dragOver", event: DragEvent): void;
  (e: "dragLeave", event: DragEvent): void;
  (e: "update:panelDimensions", value: number): void;
  (e: "initialized"): void;
  

}>();

const vueFlowRef = ref<InstanceType<typeof VueFlow>>();

watch(vueFlowRef, () => {
  if (vueFlowRef.value) {
    emits("update:panelDimensions", vueFlowRef.value.dimensions);
    emits("initialized");
  }
})
</script>

<style scoped lang="scss"></style>
