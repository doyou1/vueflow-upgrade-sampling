<template>
  <el-container class="wrap conatiner">
    <el-header class="header">Header</el-header>
    <el-container v-loading="!isRealInit"class="container">
      <el-main class="main">
        <main-panel
          :nodes="nodes"
          :edges="edges"
          v-model:panel-dimensions="panelDimensions"
          @node-drag-stop="handleNodeDragStop"
          @initialized="onInitialized"
          @add:child-node="onAddChildNode"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElMain } from "element-plus";
import MainPanel from "@/components/MainPanel.vue";
import {
  useVueflowController,
} from "@/composables/use-vueflow-controller";
const {
  nodes,
  edges,
  panelDimensions,
  isRealInit,
  onInitialized,
  onAddChildNode,
  handleNodeDragStop,
} = useVueflowController();
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
