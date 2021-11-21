<script setup lang="ts">
defineProps<{ value: number; title?: string; label?: string }>()
</script>

<template>
  <div class="flex flex-column gap-3">
    <h4 v-if="title">{{ title }}</h4>
    <div class="statistic gap-3">
      <p>{{ value }}</p>
      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.statistic {
  display: grid;
  grid-template-columns: 4.4rem 1fr;

  p,
  span {
    color: var(--gray-700);
    font-size: 1.1rem;
  }

  p {
    font-weight: bold;
  }
}
</style>
