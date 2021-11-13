<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="card h-full w-full">
    <div v-if="title || $slots.header" class="card__header">
      <h3 class="select-none" v-if="title">{{ title }}</h3>
      <slot name="header" />
    </div>
    <div class="card__content w-full h-full">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.card {
  --distance: 1rem;
  position: relative;
  padding-top: var(--distance);

  &__content {
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
  }

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
