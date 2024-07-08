<template>
  <el-popover :placement="type === 'target' ? 'bottom' : 'top'" trigger="click">
    <template #reference>
      <Handle
        :class="['handle', type]"
        :type="type"
        :position="type === 'target' ? Position.Bottom : Position.Top"
      >
        <el-icon><CirclePlus /></el-icon>
      </Handle>
    </template>
    <template #default>
      <div class="items">
        <el-popover v-for="item in items" placement="right" trigger="hover">
          <template #reference>
            <div class="item">
              <div class="icon">
                <icon-sql v-if="item.type === 'sql'" />
                <icon-select v-else-if="item.type === 'select'" />
                <icon-group-by v-else-if="item.type === 'group_by'" />
                <icon-join v-else-if="item.type === 'join'" />
                <icon-filter v-else-if="item.type === 'filter'" />
                <icon-data-source v-else-if="item.type === 'data_source'" />
                <icon-dataset v-else-if="item.type === 'dataset'" />
              </div>
              <div class="label">{{ item.label }}</div>
            </div>
          </template>
          <template #default>
            <div class="item-detail">
              <div class="icon">
                <icon-sql v-if="item.type === 'sql'" />
                <icon-select v-else-if="item.type === 'select'" />
                <icon-group-by v-else-if="item.type === 'group_by'" />
                <icon-join v-else-if="item.type === 'join'" />
                <icon-filter v-else-if="item.type === 'filter'" />
                <icon-data-source v-else-if="item.type === 'data_source'" />
                <icon-dataset v-else-if="item.type === 'dataset'" />
              </div>
              <div class="label">{{ item.label }}</div>
              <div class="description">{{ item.description }}</div>
            </div>
          </template>
        </el-popover>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { ElIcon, ElPopover } from "element-plus";
import { CirclePlus } from "@element-plus/icons-vue";
import { computed } from "vue";
import IconSql from "@/components/icons/IconSql.vue";
import IconSelect from "@/components/icons/IconSelect.vue";
import IconGroupBy from "@/components/icons/IconGroupBy.vue";
import IconJoin from "@/components/icons/IconJoin.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconDataSource from "@/components/icons/IconDataSource.vue";
import IconDataset from "@/components/icons/IconDataset.vue";

defineProps<{
  type: "target" | "source";
}>();

const items = computed(() => [
  {
    type: "sql",
    onClick: () => {},
    label: "DataSource",
    description: "This is DataSource Detail",
  },
  {
    type: "select",
    onClick: () => {},
    label: "Dataset",
    description: "This is Dataset Detail",
  },
  {
    type: "group_by",
    onClick: () => {},
    label: "Filter",
    description: "This is Filter Detail",
  },
  {
    type: "join",
    onClick: () => {},
    label: "GroupBy",
    description: "This is GroupBy Detail",
  },
  {
    type: "filter",
    onClick: () => {},
    label: "Join",
    description: "This is Join Detail",
  },
  {
    type: "data_source",
    onClick: () => {},
    label: "Select",
    description: "This is Select Detail",
  },
  {
    type: "dataset",
    onClick: () => {},
    label: "Sql",
    description: "This is Sql Detail",
  },
]);
</script>

<style scoped lang="scss">
.target.handle {
  width: 1rem;
  height: 1rem;
  left: 50%;
  bottom: -0.5rem;
  background-color: white;

  :hover {
    scale: 1.1;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
}

.items {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgb(249 250 251);
  }

  .icon {
    width: 40px;
    height: 40px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
  .label {
    margin-left: 8px;
  }
}

.item-detail {
  display: flex;
  flex-direction: column;
  .icon {
    width: 40px;
    height: 40px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
  .label {
    margin-top: 8px;
  }

  .description {
    margin-top: 8px;
    color: rgb(156 163 175);
  }
}
</style>
