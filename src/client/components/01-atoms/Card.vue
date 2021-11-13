<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="card h-full w-full">
    <div v-if="title || $slots.header" class="card__header">
      <h3 v-if="title">{{ title }}</h3>
      <slot name="header" />
    </div>
    <slot name="default" />
  </div>
</template>

<style lang="scss">
.card {
  --distance: 1rem;
  position: relative;
  padding-top: var(--distance);

  &__header {
    position: absolute;
    display: flex;
    align-items: center;
    border-radius: 2px;
    overflow: hidden;
    padding: calc(var(--distance) / 1.6) var(--distance);
    gap: var(--distance);
    background-color: var(--primary-color);
    z-index: 1;
    color: white;
    top: 0;
    left: var(--distance);

    h3 {
      color: currentColor;
    }
  }
}
</style>
