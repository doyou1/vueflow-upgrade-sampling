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
