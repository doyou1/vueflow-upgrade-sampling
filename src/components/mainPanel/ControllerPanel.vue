<template>
  <panel
    position="top-left"
    class="controller-panel">
    <div>
      <el-button type="primary" :icon="Back" :disabled="!canUndo" @click="$emit('undo')" />
      <el-button type="primary" :icon="Right" :disabled="!canRedo" @click="$emit('redo')" />
    </div>
  </panel>
  
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { Back, Right } from '@element-plus/icons-vue'
import { Panel } from "@vue-flow/core";
defineProps<{
  canRedo: boolean,
  canUndo: boolean,
}>();

defineEmits<{
  (e: "undo"): void;
  (e: "redo"): void;
}>();
</script>