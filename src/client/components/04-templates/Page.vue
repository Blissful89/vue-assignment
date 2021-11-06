<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="page flex flex-column">
    <header class="page__header flex flex-column justify-content-center">
      <h1 class="mb-0">{{ title }}</h1>
      <slot name="header"></slot>
    </header>
    <main class="page__content overflow-y-auto">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<style lang="scss">
.page {
  --page-header-height: 6rem;
  --page-content-height: calc(100vh - var(--page-header-height) - 61px);
  --padding: 1rem;

  & > * {
    padding: 0 var(--padding);
  }

  &__header {
    height: var(--page-header-height);
  }

  &__content {
    height: var(--page-content-height);
  }
}
</style>
