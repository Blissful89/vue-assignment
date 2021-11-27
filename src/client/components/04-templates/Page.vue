<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="page flex flex-column">
    <header class="page__header flex align-items-center justify-content-between">
      <div>
        <h1 class="mb-0">{{ title }}</h1>
        <slot name="header" />
      </div>
      <slot name="header:end" />
    </header>
    <main class="page__content overflow-y-auto">
      <slot name="content" />
    </main>
  </div>
</template>

<style lang="scss">
.page {
  --page-header-height: 6rem;
  --page-content-height: calc(100vh - var(--page-header-height) - 60px);
  --distance: 1rem;

  & > * {
    padding: calc(var(--distance) / 1.6) var(--distance);
  }

  &__header {
    height: var(--page-header-height);
  }

  &__content {
    height: var(--page-content-height);
  }
}
</style>
