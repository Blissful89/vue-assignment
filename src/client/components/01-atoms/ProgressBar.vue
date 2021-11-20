<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'

withDefaults(defineProps<{ value: number; title?: string; label?: string }>(), { label: '%' })
</script>

<template>
  <div class="progress-bar">
    <h4 class="progress-bar__title">{{ title }}</h4>
    <ProgressBar :value="value">
      {{ value }} {{ label }}
    </ProgressBar>
  </div>
</template>

<style lang="scss">
.progress-bar {
  --distance: 1rem;
  display: flex;
  flex-direction: column;
  padding: var(--distance);
  gap: var(--distance);
}
</style>
