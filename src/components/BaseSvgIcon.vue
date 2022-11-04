<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps<{iconClass:string,className:string}>();
  const iconName = computed(() => {
    return `#icon-${props.iconClass}`;
  })
  const svgClass = computed(() => {
    return props.className ? "svg-icon " + props.className : "svg-icon"
  })
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
