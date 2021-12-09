<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import ToggleButton from 'primevue/togglebutton'
import repository from '@/client/api/repository'
import Info from '@/client/components/02-molecules/Info.vue'
import LineChart from '@/client/components/02-molecules/LineChart.vue'
import Card from '@/client/components/01-atoms/Card.vue'

const Map = defineAsyncComponent(() => import('@/client/components/02-molecules/Map.vue'))
const mapLocked = ref(true)
const isLoading = repository.loading
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
        <LineChart id="speedProfile" itemKey="speed" />
      </Card>
    </div>
    <div class="grid-soc">
      <Card :title="$t('pages.dashboard.socProfile')" :loading="isLoading">
        <LineChart id="socProfile" itemKey="soc" />
      </Card>
    </div>
  </div>
</template>

<style lang="scss">
.grid-container {
  --repeat-small: 1fr repeat(2, 25vh);
  display: grid;
  gap: 1rem;

  grid-template-rows: 30vh var(--repeat-small);
  grid-template-columns: 100%;

  @media screen and (min-width: $bp-small) {
    grid-template-rows: 50vh var(--repeat-small);
  }

  @media screen and (min-width: $bp-larger) {
    grid-template-columns: 40vw 1fr;
    grid-template-rows: 20rem repeat(2, 1fr);

    .grid-map {
      grid-column: span 1;
    }
    .grid-info {
      grid-column: 2 / -1;
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
