<script setup lang="ts">
import { computed, onMounted, ref, watch, unref } from 'vue'
import Point from 'ol/geom/Point'
import View from 'ol/View'
import Map from 'ol/Map'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import { easeOut } from 'ol/easing'
import { fromLonLat } from 'ol/proj'
import eventbus from '@/client/utils/eventbus'
import repository from '@/client/api/repository'
import 'ol/ol.css'

// EPSG:3857
// EPSG:4326
const tileUrl = 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
const map = ref('map')
const utrecht = [52.08921432495117, 5.106114864349365]

const transform3857 = ([lat, long]: number[]) => fromLonLat([long, lat])
const toPoint = ([long, lat]: number[]) => new Point([long, lat])

const icon = new Icon({ src: 'assets/bus.svg', scale: 0.8 })
const style = new Style({ image: icon })
const geometry = toPoint(transform3857(utrecht))
const feature = new Feature(geometry)
feature.setStyle(style)

const iconSource = new VectorSource({ features: [feature] })
const iconLayer = new VectorLayer({ source: iconSource })
const tileLayer = new TileLayer({ source: new OSM({ url: tileUrl }) })
const view = new View({ zoom: 0, center: [0, 0] })

const PREP_TIME = 2000
const isLoading = repository.loading
const isReady = ref(false)

watch(isLoading, () => {
  if (!unref(isLoading)) {
    console.log('done with loading')

    new Map({
      target: map.value,
      layers: [tileLayer, iconLayer],
      view,
    })

    view.animate({
      center: transform3857(utrecht),
      zoom: 15,
      duration: PREP_TIME,
      easing: easeOut,
    })

    setTimeout(() => {
      isReady.value = true
    }, PREP_TIME)
  }
})

// TODO: Stop on interaction + button for toggle
watch(isReady, () => {
  eventbus.on('message', (event) => {
    const coords = transform3857(event.gps.split('|').map((coordStr) => Number(coordStr)))
    view.setCenter(coords)
    geometry.setCoordinates(coords, { duration: 5000 })
  })
})
</script>

<template>
  <div :class="isLoading ? 'skeleton' : ''" class="w-full h-full" ref="map" />
</template>

<style lang="scss">
.ol-zoom {
  display: none;
}
</style>
