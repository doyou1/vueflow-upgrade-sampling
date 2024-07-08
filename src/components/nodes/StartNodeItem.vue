<template>
  <div
    :class="['wrap', isHover && 'is-hover']"
    :style="innerStyle"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="content">
      <div class="icon">
        <el-icon><HomeFilled /></el-icon>
      </div>
      <div class="name">
        {{ name }}
      </div>
    </div>
    <node-handle class="target-handle" type="target" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { SIZE } from "@/composables/use-vueflow-controller";
import { ElIcon } from "element-plus";
import { HomeFilled } from "@element-plus/icons-vue";
import NodeHandle from "@/components/nodes/NodeHandle.vue";
defineProps<{
  id: string;
  name: string;
}>();

const isHover = ref<boolean>(false);

const innerStyle = computed(() => ({
  "--wrap-width": `${SIZE.WIDTH}px`,
  "--wrap-height": `${SIZE.HEIGHT}px`,
}));
</script>

<style scoped lang="scss">
.wrap {
  width: var(--wrap-width);
  height: var(--wrap-height);
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

      i,
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

  .source-handle,
  .target-handle {
    display: none;
  }
}

.wrap.is-hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  .source-handle,
  .target-handle {
    display: block;
  }
}
</style>
