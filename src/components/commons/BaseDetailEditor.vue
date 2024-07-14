<template>
  <div class="base-detail-editor">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.base-detail-editor {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: white;
    right: 0;
}
</style>
