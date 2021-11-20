<script setup lang="ts">
import { ref, unref } from 'vue'
import ToggleButton from 'primevue/togglebutton'
import Map from '@/client/components/02-molecules/Map.vue'
import Bars from '@/client/components/02-molecules/Bars.vue'
import Card from '@/client/components/01-atoms/Card.vue'
import repository from '@/client/api/repository'

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
        <Bars />
      </Card>
    </div>
    <div class="grid-speed-profile">
      <Card :title="$t('pages.dashboard.profile')"  :loading="isLoading"> </Card>
    </div>
    <div class="grid-soc">
      <Card :title="$t('pages.dashboard.soc')"  :loading="isLoading"> </Card>
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

  @media screen and (min-width: $bp-largest) {
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
