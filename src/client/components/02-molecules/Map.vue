<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
import eventbus from '@/client/utils/eventbus'
import 'ol/ol.css'

const tileUrl = 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
const map = ref('map')
const startCoords = [4.895168, 52.370216]

const transform = ([lat, long]: number[]) => {
  const point = new Point([long, lat])
  point.transform('EPSG:4326', 'EPSG:900913')
  return point
}

const icon = new Icon({ src: '../../assets/bus.svg', scale: 0.8 })
const style = new Style({ image: icon })
const geometry = transform(startCoords)
const feature = new Feature(geometry)
feature.setStyle(style)

const iconSource = new VectorSource({ features: [feature] })
const iconLayer = new VectorLayer({ source: iconSource })
const tileLayer = new TileLayer({
  source: new OSM({ url: tileUrl }),
})

const view = new View({ zoom: 15, center: geometry.getCoordinates() })

onMounted(() => {
  new Map({
    target: map.value,
    layers: [tileLayer, iconLayer],
    view,
  })
})

eventbus.on('message', (event) => {
  const coords = event.gps.split('|').map((coordStr) => Number(coordStr))
  view.setCenter(transform(coords).getCoordinates());
  feature.setGeometry(transform(coords))
})
</script>

<template>
  <div class="w-full h-full" ref="map" />
</template>

<style lang="scss">
.ol-zoom {
  display: none;
}
</style>
