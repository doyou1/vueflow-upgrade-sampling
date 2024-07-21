<template>
  <panel class="detail-editor-panel" ref="panelRef" position="top-right">
    <div class="header">
      <el-button :icon="Close" circle @click="$emit('close')"></el-button>
    </div>
    <div class="content">
      <!-- <join-content v-if="targetNode.type === 'join' "> {{ targetNode.data?.formData }}</join-content>
      <filter-content v-else-if="targetNode.type === 'filter' "> {{ targetNode.data?.formData }}</filter-content>
      <sql-content v-else-if="targetNode.type === 'sql' "> {{ targetNode.data?.formData }}</sql-content>
      <select-content v-else-if="targetNode.type === 'select' "> {{ targetNode.data?.formData }}</select-content>
      <group-by-content v-else-if="targetNode.type === 'group_by' "> {{ targetNode.data?.formData }}</group-by-content> -->
      <!-- <data-source-content v-else-if="targetNode.type === 'data_source'" :node="targetNode"> {{ targetNode.data?.formData }}</data-source-content> -->
      <data-source-content v-if="targetNode.type === 'data_source'" :node="targetNode"> {{ targetNode.data?.formData }}</data-source-content>
      <!-- <dataset-content v-else-if="targetNode.type === 'dataset' "> {{ targetNode.data?.formData }}</dataset-content> -->
    </div>
  </panel>
</template>

<script setup lang="ts">
import { Panel } from "@vue-flow/core";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Node } from "@/composables/use-vueflow-controller";
import { ElButton } from "element-plus";
import { Close } from "@element-plus/icons-vue";
// import JoinContent from "@/components/detailEditor/JoinContent.vue";
// import FilterContent from "@/components/detailEditor/FilterContent.vue";
// import SqlContent from "@/components/detailEditor/SqlContent.vue";
// import SelectContent from "@/components/detailEditor/SelectContent.vue";
// import GroupByContent from "@/components/detailEditor/GroupByContent.vue";
import DataSourceContent from "@/components/detailEditor/DataSourceContent.vue";
// import DatasetContent from "@/components/detailEditor/DatasetContent.vue";
defineProps<{
  targetNode: Node;
}>();

const emits = defineEmits<{
  (e: "close"): void;
}>();
const panelRef = ref();
onClickOutside(panelRef, (_: PointerEvent) => {
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
  padding: 8px;

  .header {
    display: flex;
  }

  .content {
    display: flex;
    padding: 16px;
  }
}
</style>
