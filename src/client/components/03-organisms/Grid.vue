<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import ToggleButton from 'primevue/togglebutton'
import repository from '@/client/api/repository'
import Info from '@/client/components/02-molecules/Info.vue'
import LineChart from '@/client/components/02-molecules/LineChart.vue'
import Card from '@/client/components/01-atoms/Card.vue'

const Map = defineAsyncComponent(() => import('@/client/components/02-molecules/Map.vue'))
const mapLocked = ref(true)
const isLoading = repository.loading
const history = ref<Vehicles.HistoryData[]>([])

const loadHistory = () =>
  repository.loadHistory().then((result) => {
    if (Array.isArray(result)) {
      history.value = result
    }
  })

onMounted(loadHistory)
const id = setInterval(loadHistory, 5000)
onUnmounted(() => clearInterval(id))
</script>

<template>
  <div class="grid-container h-full w-full">
    <div class="grid-map">
      <Card :title="$t('pages.dashboard.map')" :loading="isLoading" :overlap="true">
        <template v-slot:header>
          <ToggleButton
            v-model="mapLocked"
            onIcon="pi pi-lock"
            offIcon="pi pi-lock-open"
            class="p-button-secondary p-button-rounded"
          />
        </template>
        <Map :locked="mapLocked" />
      </Card>
    </div>
    <div class="grid-info">
      <Card :title="$t('pages.dashboard.info')" :loading="isLoading">
        <Info />
      </Card>
    </div>
    <div class="grid-speed-profile">
      <Card :title="$t('pages.dashboard.profile')" :loading="isLoading">
        <LineChart id="speedHistogram" key="speed" :data="history" />
      </Card>
    </div>
    <div class="grid-soc">
      <Card :title="$t('pages.dashboard.soc')" :loading="isLoading"> </Card>
    </div>
  </div>
</template>

<style lang="scss">
.grid-container {
  --repeat-small: 1fr repeat(2, 25vh);
  display: grid;
  gap: 1rem;

  grid-template-rows: 30vh var(--repeat-small);

  @media screen and (min-width: $bp-small) {
    grid-template-rows: 50vh var(--repeat-small);
  }

  @media screen and (min-width: $bp-larger) {
    --size: 40vh;

    grid-template-columns: repeat(2, var(--size)) repeat(2, 1fr);
    grid-template-rows: var(--size);

    .grid-map {
      grid-column: span 2;
    }
    .grid-info {
      grid-column: 3 / -1;
    }
    .grid-speed-profile {
      grid-column: 1 / -1;
    }
    .grid-soc {
      grid-column: 1 / -1;
    }
  }
}
</style>
