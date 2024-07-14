<template>
  <div class="base-node" :style="innerStyle">
    <Handle v-if="visibleSourceHandle" type="source" :position="Position.Top" />
    <div class="content">
      <div class="icon">
        <slot name="icon" />
      </div>
      <div class="name">
        <slot name="name" />
      </div>
    </div>
    <Handle
      v-if="visibleTargetHandle"
      type="target"
      :position="Position.Bottom"
    />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { computed } from "vue";
import { SIZE } from "@/composables/use-vueflow-controller";
withDefaults(
  defineProps<{
    visibleSourceHandle?: boolean;
    visibleTargetHandle?: boolean;
  }>(),
  {
    visibleSourceHandle: true,
    visibleTargetHandle: true,
  }
);

const emits = defineEmits<{
//   (e: "click:menu", type: MenuType): void;
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
