<template>
  <el-popover
    ref="listRef"
    trigger="click"
    :placement="type === 'target' ? 'bottom' : 'top'"
    :show-after="100"
    :hide-after="100"
  >
    <template #reference>
      <Handle
        :class="['handle', type]"
        :type="type"
        :position="type === 'target' ? Position.Bottom : Position.Top"
      >
        <div class="icon">
          <el-icon><circle-plus /></el-icon>
        </div>
      </Handle>
    </template>
    <template #default>
      <div class="items">
        <el-popover
          ref="detailRefs"
          v-for="item in items"
          placement="right"
          trigger="hover"
          :show-after="100"
          :hide-after="100"
        >
          <template #reference>
            <div class="item" @click="handleClickItem(item.type)">
              <div class="icon">
                <icon-sql v-if="item.type === 'sql'" />
                <icon-select v-else-if="item.type === 'select'" />
                <icon-group-by v-else-if="item.type === 'group_by'" />
                <icon-join v-else-if="item.type === 'join'" />
                <icon-filter v-else-if="item.type === 'filter'" />
                <icon-data-source v-else-if="item.type === 'data_source'" />
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
import { computed, ref } from "vue";
import IconSql from "@/components/commons/icons/IconSql.vue";
import IconSelect from "@/components/commons/icons/IconSelect.vue";
import IconGroupBy from "@/components/commons/icons/IconGroupBy.vue";
import IconJoin from "@/components/commons/icons/IconJoin.vue";
import IconFilter from "@/components/commons/icons/IconFilter.vue";
import IconDataSource from "@/components/commons/icons/IconDataSource.vue";

const props = defineProps<{
  type: "target" | "source";
}>();

const emits = defineEmits<{
  (e: "add:parentNode", type: string): void;
  (e: "add:childNode", type: string): void;
}>();

const listRef = ref();
const detailRefs = ref();

const handleClickItem = (itemType: string) => {
  if (props.type === "source") {
    emits("add:parentNode", itemType);
  } else if (props.type === "target") {
    emits("add:childNode", itemType);
  }
  hidePopovers();
};

const hidePopovers = () => {
  listRef.value?.hide();
  detailRefs.value?.forEach((ref: any) => ref?.hide());
};

const items = computed(() => [
  {
    type: "data_source",
    onClick: () => {},
    label: "DataSource",
    description: "This is DataSource Detail",
  },
  {
    type: "filter",
    onClick: () => {},
    label: "Filter",
    description: "This is Filter Detail",
  },
  {
    type: "group_by",
    onClick: () => {},
    label: "GroupBy",
    description: "This is GroupBy Detail",
  },
  {
    type: "join",
    onClick: () => {},
    label: "Join",
    description: "This is Join Detail",
  },
  {
    type: "select",
    onClick: () => {},
    label: "Select",
    description: "This is Select Detail",
  },
  {
    type: "sql",
    onClick: () => {},
    label: "Sql",
    description: "This is Sql Detail",
  },
]);
</script>

<style scoped lang="scss">
.source.handle,
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

  .icon {
    pointer-events: none;
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
