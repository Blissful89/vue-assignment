<script setup lang="ts">
import { ref } from 'vue';
import repository from '@/client/api/repository'
import eventbus from '@/client/utils/eventbus'
import ProgressBar from '@/client/components/01-atoms/ProgressBar.vue'
import uselocales from '@/client/compositions/useLocales';

const isLoading = repository.loading
const classes = 'flex flex-column h-full justify-content-evenly';
const { t, locale } = uselocales();

const values = ref({
  speed: 0,
  soc: 0,
});

eventbus.on('message', (event) => {
  values.value.speed = event.speed
  values.value.soc = event.soc
})

const getLabel = () => locale.value === 'nl' ? 'km/h' : 'mph'
const getSpeed = () => locale.value === 'nl' ? values.value.speed : Math.round(values.value.speed / 1.6)
</script>

<template>
<div v-if="isLoading" :class="classes" class="skeleton"></div>
<div v-else :class="classes">
  <ProgressBar :title="t('pages.dashboard.speed')" :value="getSpeed()" :label="getLabel()" />
  <ProgressBar :title="t('pages.dashboard.soc')" :value="values.soc" />
</div>
</template>