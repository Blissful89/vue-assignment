<script setup lang="ts">
import { ref } from 'vue'
import eventbus from '@/client/utils/eventbus'
import ProgressBar from '@/client/components/01-atoms/ProgressBar.vue'
import uselocales from '@/client/compositions/useLocales'

const { t, locale } = uselocales()

const values = ref({
  speed: 0,
  soc: 0,
})

eventbus.on('message', (event) => {
  values.value.speed = event.speed
  values.value.soc = event.soc
})

const getSpeed = () => locale.value === 'nl' 
  ? values.value.speed 
  : Math.round(values.value.speed / 1.6)
const getSpeedLabel = () => (locale.value === 'nl' ? 'km/h' : 'mph')
</script>

<template>
  <div class="flex flex-column h-full justify-content-evenly">
    <ProgressBar :title="t('pages.dashboard.speed')" :value="getSpeed()" :label="getSpeedLabel()" />
    <ProgressBar :title="t('pages.dashboard.soc')" :value="values.soc" />
  </div>
</template>
