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
    <footer class="page__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="scss">
.page {
  --page-header-height: 6rem;
  --page-footer-height: 3rem;
  --page-content-height: calc(100vh - var(--page-header-height) - var(--page-footer-height) - 62px);
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

  &__footer {
    height: var(--page-footer-height);
  }
}
</style>
