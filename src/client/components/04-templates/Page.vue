<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="page flex flex-column h-full">
    <header class="page__header w-full">
      <div>
        <h1 class="mb-0">{{ title }}</h1>
        <div>
          <slot name="header"></slot>
        </div>
      </div>
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
  --page-header-height: 8.2rem;
  --page-footer-height: 4rem;
  --page-top-offset: calc(100vh - var(--page-footer-height) - var(--page-header-height));
  --padding: 1.4rem;

  > * {
    padding: var(--padding);
  }

  &__header {
    height: var(--page-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
  }

  &__content {
    height: var(--page-top-offset);
  }

  &__footer {
    height: var(--page-footer-height);
  }
}
</style>
