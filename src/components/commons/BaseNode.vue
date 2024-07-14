<template>
  <div class="base-node" :style="innerStyle">
    <base-handle
      v-if="visibleSourceHandle"
      type="source"
      @add:parent-node="$emit('add:parentNode', $event)"
    />
    <div class="content" @click="$emit('click:node')">
      <div class="icon">
        <slot name="icon" />
      </div>
      <div class="name">
        <slot name="name" />
      </div>
    </div>
    <base-handle
      v-if="visibleTargetHandle"
      type="target"
      @add:child-node="$emit('add:childNode', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SIZE } from "@/composables/use-vueflow-controller";
import BaseHandle from "@/components/commons/BaseHandle.vue";
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
  (e: "click:node"): void;
  (e: "add:parentNode", type: string): void;
  (e: "add:childNode", type: string): void;
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
