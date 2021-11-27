<script setup lang="ts">
import { ref } from 'vue'
import eventbus from '@/client/utils/eventbus'
import ProgressBar from '@/client/components/01-atoms/ProgressBar.vue'
import Statistic from '@/client/components/01-atoms/Statistic.vue'
import uselocales from '@/client/compositions/useLocales'

const { t, locale } = uselocales()

const values = ref({
  speed: 0,
  soc: 0,
  energy: 0,
  odo: 0,
})

eventbus.on('message', (event) => {
  values.value.speed = event.speed
  values.value.soc = event.soc
  values.value.energy = event.energy
  values.value.odo = event.odo
})

const getLocaleValue = (value: number) => (locale.value !== 'en' ? value : value / 1.6)
</script>

<template>
  <div class="flex flex-column px-3 pb-3 gap-3">
    <ProgressBar
      :title="t('pages.dashboard.speed')"
      :value="Math.round(getLocaleValue(values.speed))"
      :label="t('general.speed')"
    />
    <ProgressBar :title="t('pages.dashboard.soc')" :value="values.soc" />
    <div class="info__statistics gap-3">
      <Statistic :title="t('pages.dashboard.energy')" :value="values.energy" label="kW" />
      <Statistic
        :title="t('pages.dashboard.odo')"
        :value="Math.round(getLocaleValue(values.odo) * 100) / 100"
        :label="t('general.distance')"
      />
    </div>
  </div>
</template>

<style lang="scss">
.info__statistics {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
