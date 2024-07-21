<template>
  <div class="base-node" :style="innerStyle">
    <base-handle
      v-if="visibleSourceHandle"
      type="source"
      :disabled="hasParentNodes"
      @add:parent-node="$emit('add:parentNode', $event)"
    />
    <el-popover
      trigger="contextmenu"
      :disabled="!visibleMenu"
      placement="right"
      :show-after="100"
      :hide-after="100"
    >
      <template #reference>
        <div class="content" @click="$emit('click:node')" @contextmenu="">
          <div class="icon">
            <slot name="icon" />
          </div>
          <div class="name">
            <slot name="name" />
          </div>
        </div>
      </template>
      <template #default>
        <div v-for="menu in menus">
          <el-button @click="$emit('click:nodeMenu', menu)">{{
            menu.toUpperCase()
          }}</el-button>
        </div>
      </template>
    </el-popover>
    <base-handle
      v-if="visibleTargetHandle"
      type="target"
      :disabled="hasChildNodes"
      @add:child-node="$emit('add:childNode', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SIZE } from "@/composables/use-vueflow-controller";
import BaseHandle from "@/components/commons/BaseHandle.vue";
import { ElPopover, ElButton } from "element-plus";

withDefaults(
  defineProps<{
    visibleSourceHandle?: boolean;
    visibleTargetHandle?: boolean;
    visibleMenu?: boolean;
    hasChildNodes?: boolean;
    hasParentNodes?: boolean;
    menus?: Array<string>;
  }>(),
  {
    visibleSourceHandle: true,
    visibleTargetHandle: true,
    visibleMenu: true,
    hasChildNodes: false,
    hasParentNodes: false,
    menus: () => ["edit", "delete"],
  }
);

const emits = defineEmits<{
  (e: "click:node"): void;
  (e: "add:parentNode", type: string): void;
  (e: "add:childNode", type: string): void;
  (e: "click:nodeMenu", menuType: string): void;
}>();

const innerStyle = computed(() => ({
  "--node-width": `${SIZE.WIDTH}px`,
  "--node-height": `${SIZE.HEIGHT}px`,
}));
</script>

<style scoped lang="scss">
.base-node {
  width: var(--node-width);
  height: var(--node-height);
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
