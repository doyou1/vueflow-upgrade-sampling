<template>
  <div class="detail-edtior">
    <el-header class="header">
      <h4 class="title">{{ targetNode.type }}</h4>
      <div class="right-buttons">
        <div>
          <el-button size="large" type="success" @click="$emit('save', innerTargetNode)">Save</el-button>
        </div>
        <div>
          <el-button size="large" @click="$emit('close')">Close</el-button>
        </div>
      </div>
    </el-header>
    <el-main v-if="innerTargetNode.data" class="content">
      <!-- sql -->
      <sql-form
        v-if="innerTargetNode.type === 'sql'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- select -->
      <select-form
        v-if="innerTargetNode.type === 'select'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- group_by -->
      <group-by-form
        v-if="innerTargetNode.type === 'group_by'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- join -->
      <join-form
        v-if="innerTargetNode.type === 'join'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- filter -->
      <filter-form
        v-if="innerTargetNode.type === 'filter'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- data_source -->
      <data-source-form
        v-if="innerTargetNode.type === 'data_source'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
      <!-- dataset -->
      <dataset-form
        v-if="innerTargetNode.type === 'dataset'"
        :data="innerTargetNode.data"
        @update:data="innerTargetNode.data = $event;"
      />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { type Node } from "@/composables/use-vueflow-controller";
import { ElHeader, ElButton, ElMain } from "element-plus";
import DatasetForm from "@/components/detailEditor/DatasetForm.vue";
import SelectForm from "@/components/detailEditor/SelectForm.vue";
import SqlForm from "@/components/detailEditor/SqlForm.vue";
import GroupByForm from "@/components/detailEditor/GroupByForm.vue";
import JoinForm from "@/components/detailEditor/JoinForm.vue";
import FilterForm from "@/components/detailEditor/FilterForm.vue";
import DataSourceForm from "@/components/detailEditor/DataSourceForm.vue";
import { ref } from "vue";
const props = defineProps<{
  targetNode: Node;
}>();

const emits = defineEmits<{
  (e: "save", newNode: Node): void;
  (e: "close"): void;
}>();

const innerTargetNode = ref<Node>(JSON.parse(JSON.stringify(props.targetNode)));
</script>

<style scoped lang="scss">
.detail-edtior {
  width: 100%;
  height: 100%;
  background-color: white;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    .title {
      font-size: 24px;
    }

    .right-buttons {
      display: flex;
      gap: 4px;
    }
  }

}
</style>
