<template>
  <div class="wrap">
    <Handle type="source" :position="Position.Top" />
    <div class="content">
      <div class="icon">
        <icon-group-by />
      </div>
      <div class="name">
        {{ data.name }}
      </div>
    </div>
    <Handle type="target" :position="Position.Bottom" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { GroupByNodeData } from "@/composables/use-vueflow-controller";
import IconGroupBy from "@/components/icons/IconGroupBy.vue";

defineProps<{
  id: string;
  data: GroupByNodeData;
}>();
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  background-color: white;

  .content {
    border: 1px solid gray;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;

    .icon {
      width: 40px;
      height: 40px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
