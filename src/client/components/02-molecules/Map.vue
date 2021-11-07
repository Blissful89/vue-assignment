<script setup lang="ts">
import { onMounted, ref } from 'vue'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'

const map = ref('map')
onMounted(() => {
  new Map({
    target: map.value,
    layers: [
      new TileLayer({
        source: new OSM(), // tiles are served by OpenStreetMap
      }),
    ],

    // the map view will initially show the whole world
    view: new View({
      zoom: 0,
      center: [0, 0],
      constrainResolution: true,
    }),
  })
})
</script>

<template>
  <div class="w-full h-full" ref="map" />
</template>
