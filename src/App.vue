<template>
  <el-container class="wrap conatiner">
    <el-header class="header">Header</el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">
        <side-bar @drag-start="onDragStart" />
      </el-aside>
      <el-main class="main" @drop="onDrop">
        <main-panel :nodes="nodes" @node-drag-stop="handleNodeDragStop" @drag-over="onDragOver" @drag-leave="onDragLeave" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from "element-plus";
import MainPanel from "@/components/MainPanel.vue";
import SideBar from "@/components/SideBar.vue";
import {
  Node,
  useDragAndDrop,
  useVueflowController,
} from "@/composables/use-vueflow-controller";

const { nodes, handleNodeDragStop, onAddNode, onUpdateNode } = useVueflowController();
const {
  onDragStart,
  onDragLeave,
  onDragOver,
  onDrop,
} = useDragAndDrop({
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
