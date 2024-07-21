<template>
  <panel class="detail-editor-panel" ref="panelRef" position="top-right">
    {{ targetNode }}
  </panel>
</template>

<script setup lang="ts">
import { Panel } from "@vue-flow/core";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Node } from "@/composables/use-vueflow-controller";
defineProps<{
  targetNode: Node;
}>();

const emits = defineEmits<{
  (e: "close"): void;
}>();
const panelRef = ref();
onClickOutside(panelRef, () => {
  emits("close");
});
</script>

<style scoped lang="scss">
.detail-editor-panel {
  width: 400px;
  position: absolute;
  border-radius: 16px;
  background-color: white;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
