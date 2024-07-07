<template>
  <el-container class="wrap conatiner">
    <el-header class="header">Header</el-header>
    <el-container v-loading="!isRealInit" v-show="targetNode === undefined" class="container">
      <el-aside class="aside" width="200px">
        <side-bar @drag-start="onDragStart" />
      </el-aside>
      <el-main class="main" @drop="onDrop">
        <main-panel
          :nodes="nodes"
          :edges="edges"
          :can-undo="canUndo"
          :can-redo="canRedo"
          v-model:panel-dimensions="panelDimensions"
          @node-drag-stop="handleNodeDragStop"
          @drag-over="onDragOver"
          @drag-leave="onDragLeave"
          @initialized="onInitialized"
          @add-edge="onAddEdge"
          @remove:nodes="onRemoveNodes"
          @remove:edges="onRemoveEdges"
          @click:menu="onClickMenu"
          @undo="onUndo"
          @redo="onRedo"
        />
      </el-main>
    </el-container>
    <el-container v-show="targetNode" class="container">
      <detail-editor-container v-if="targetNode" :target-node="targetNode" @close="closeDetailEditor" @save="saveNode($event); closeDetailEditor();"/>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from "element-plus";
import DetailEditorContainer from "@/components/DetailEditorContainer.vue";
import MainPanel from "@/components/MainPanel.vue";
import SideBar from "@/components/SideBar.vue";
import {
  useDragAndDrop,
  useVueflowController,
  useVueflowHistoryController,
} from "@/composables/use-vueflow-controller";
import { computed } from "vue";

const {
  panelDimensions,
  nodes,
  edges,
  handleNodeDragStop,
  onAddNode,
  onUpdateNode,
  onInitialized,
  onAddEdge,
  onRemoveNodes,
  onRemoveEdges,
  onClickMenu,
  targetNode,
  closeDetailEditor,
  saveNode,
  isRealInit,
} = useVueflowController({ updateHistory: () => commit() });

const target = computed(() => {
  return {
    nodes : nodes.value,
    edges : edges.value,
  }
})

const { commit, onUndo, onRedo, canUndo, canRedo } = useVueflowHistoryController(target, {
  updateObject: (object) => {
    nodes.value = object.nodes;
    edges.value = object.edges;
  }
})

const { onDragStart, onDragLeave, onDragOver, onDrop } = useDragAndDrop({
  addNode: onAddNode,
  updateNode: onUpdateNode,
});
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: calc(100vh - 2rem);
}
.container {
  background-color: goldenrod;
}
.header {
  background-color: skyblue;
}
.aside {
  background-color: yellow;
}
.main {
  background-color: green;

  position: relative;
}
</style>

<style lang="scss">
/** vueflow css */
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.24.1/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.24.1/dist/theme-default.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css";
</style>
