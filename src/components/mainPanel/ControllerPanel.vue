<template>
  <panel
    position="top-left"
    class="controller-panel">
    <!-- <div class="history">
      <el-button type="primary" :icon="Back" :disabled="!canUndo" @click="$emit('undo')" />
      <el-button type="primary" :icon="Right" :disabled="!canRedo" @click="$emit('redo')" />
    </div> -->
    <div class="zoom">
      <el-button type="primary" :icon="ZoomOut" @click="$emit('zoomOut')" />
      <el-button type="primary" :icon="ZoomIn" @click="$emit('zoomIn')" />
    </div>
  </panel>
  
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { ZoomOut, ZoomIn } from '@element-plus/icons-vue'
import { Panel } from "@vue-flow/core";
// defineProps<{
//   canRedo: boolean,
//   canUndo: boolean,
// }>();

defineEmits<{
  (e: "undo"): void;
  (e: "redo"): void;
  (e: "zoomOut"): void;
  (e: "zoomIn"): void;
}>();
</script>

<style scoped lang="scss">
.controller-panel {
  display: flex;
  flex-direction: row;

  gap: 16px;
}
</style>