<template>
  <div :class="['wrap', viewType]">
    <Handle v-if="!deleteHandle" type="source" :position="Position.Top" />
    <div class="content">
      <div class="icon">
        <icon-sql v-if="type === 'sql'" />
        <icon-select v-else-if="type === 'select'" />
        <icon-group-by v-else-if="type === 'group_by'" />
        <icon-join v-else-if="type === 'join'" />
        <icon-filter v-else-if="type === 'filter'" />
        <icon-data-source v-else-if="type === 'data_source'" />
        <icon-dataset v-else-if="type === 'dataset'" />
      </div>
      <div class="name">
        {{ name }}
      </div>
    </div>
    <Handle v-if="!deleteHandle"  type="target" :position="Position.Bottom" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import IconSql from "@/components/icons/IconSql.vue";
import IconSelect from "@/components/icons/IconSelect.vue";
import IconGroupBy from "@/components/icons/IconGroupBy.vue";
import IconJoin from "@/components/icons/IconJoin.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconDataSource from "@/components/icons/IconDataSource.vue";
import IconDataset from "@/components/icons/IconDataset.vue";
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    id: string;
    // type: NodeType;
    type: string;
    name: string;
    viewType?: "sidebar" | "main-panel";
  }>(),
  {
    viewType: "main-panel",
  }
);

const deleteHandle = computed(() => props.viewType === "sidebar")
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  background-color: white;

  &.sidebar {
    &:hover {
      cursor: grab;
    }
  }

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
