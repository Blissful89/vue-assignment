<template>
  <div class="grid-container h-full w-full">
    <div class="grid-element-1">
      <slot name="map" />
    </div>
    <div class="grid-element-2">
      <slot name="bars" />
    </div>
    <div class="grid-element-3">
      <slot name="speedProfile" />
    </div>
    <div class="grid-element-4">
      <slot name="stateOfCharge" />
    </div>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  gap: 1rem;

  grid-template-rows: 50vh repeat(3, 22vh);

  @media screen and (min-width: $bp-largest) {
    --size: 40vh;

    grid-template-columns: repeat(2, var(--size)) repeat(2, 1fr);
    grid-template-rows: var(--size);

    .grid-element-1 {
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

.ol-attribution {
  display: none !important;
}
</style>
