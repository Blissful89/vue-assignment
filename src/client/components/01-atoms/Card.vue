<script setup lang="ts">

defineProps<{ title?: string; loading?: boolean; overlap?: boolean }>()
</script>

<template>
  <div class="card h-full w-full">
    <template v-if="title || $slots.header">
      <h3 class="card__title select-none" v-if="title">{{ title }}</h3>
      <div class="card__header">
        <slot v-if="!loading" name="header" />
      </div>
    </template>
    <div :class="overlap && 'card__content--overlap'" class="card__content w-full h-full">
      <slot name="default" />
      <div v-if="loading" class="skeleton"></div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  --distance: 0.6rem;
  --border-radius: 3px;
  position: relative;
  padding-top: var(--distance);

  @media screen and (min-width: $bp-small) {
    --distance: 1rem;
  }

  &__content {
    position: relative;
    border-radius: var(--border-radius);
    padding-top: calc(var(--distance) * 2);
    overflow: hidden;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

    &--overlap {
      padding-top: 0;
    }
  }

  &__title {
    position: absolute;
    z-index: 1;
    color: white;
    background-color: var(--primary-color);
    padding: calc(var(--distance) / 1.6) var(--distance);
    border-radius: var(--border-radius);
    transform: translateY(-50%);
    left: var(--distance);
  }

  &__header {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: var(--distance);
    top: calc(var(--distance) * 2);
    right: var(--distance);
  }
}
</style>
