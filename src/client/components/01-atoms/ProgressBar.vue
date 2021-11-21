<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'

withDefaults(defineProps<{ value: number; title?: string; label?: string }>(), { label: '%' })
</script>

<template>
  <div class="flex flex-column gap-3">
    <h4>{{ title }}</h4>
    <ProgressBar :value="value">
      {{ value }} {{ label }}
    </ProgressBar>
  </div>
</template>

<style lang="scss">
.p-progressbar {
  height: 2.4rem;

  &-label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p-progressbar-value {
    background: var(--primary-color);
  }
}
</style>