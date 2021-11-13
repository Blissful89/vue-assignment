<script setup lang="ts">
import Map from '@/client/components/02-molecules/Map.vue'
import Card from '@/client/components/01-atoms/Card.vue'
</script>

<template>
  <div class="grid-container h-full w-full">
    <div class="grid-map">
      <Card title="Map">
        <Map />
      </Card>
    </div>
    <div class="grid-element-2">
      Bars
    </div>
    <div class="grid-element-3">
      Speed Profile
    </div>
    <div class="grid-element-4">
      State of Charge
    </div>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  gap: 1rem;

  grid-template-rows: 30vh repeat(3, 22vh);

  @media screen and (min-width: $bp-small) {
    grid-template-rows: 50vh repeat(3, 22vh);
  }

  @media screen and (min-width: $bp-largest) {
    --size: 40vh;

    grid-template-columns: repeat(2, var(--size)) repeat(2, 1fr);
    grid-template-rows: var(--size);

    .grid-map {
      grid-column: span 2;
    }
    .grid-element-2 {
      grid-column: 3 / -1;
    }
    .grid-element-3 {
      grid-column: 1 / -1;
    }
    .grid-element-4 {
      grid-column: 1 / -1;
    }
  }
}
</style>
