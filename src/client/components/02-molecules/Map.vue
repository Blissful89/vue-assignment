<script setup lang="ts">
import { ref, watch, defineProps, onMounted } from 'vue'
import { Interaction, MouseWheelZoom, DragPan, DragZoom, DragRotateAndZoom } from 'ol/interaction'
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
import Collection from 'ol/Collection'
import eventbus from '@/client/utils/eventbus'
import 'ol/ol.css'

const UTRECHT = [52.08921432495117, 5.106114864349365]
const DEFAULT_ZOOM = 15

const props = defineProps<{ locked: boolean }>()

const tileUrl = 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
const mapRef = ref('mapRef')

const dragPan = new DragPan()
const dragZoom = new DragZoom()
const dragRotateAndZoom = new DragRotateAndZoom()
const mouseWheelZoom = new MouseWheelZoom()

const interactionsArray = [dragPan, dragZoom, dragRotateAndZoom, mouseWheelZoom]
const interactions = new Collection<Interaction>([...interactionsArray])
const map = new Map({ interactions })

const transform = ([lat, long]: number[]) => fromLonLat([long, lat])
const toPoint = ([long, lat]: number[]) => new Point([long, lat])
const setInteractability = () =>
  interactionsArray.forEach((interaction) =>
    props.locked ? map.removeInteraction(interaction) : map.addInteraction(interaction),
  )

const icon = new Icon({ src: 'assets/bus.svg', scale: 0.8 })
const style = new Style({ image: icon })
const geometry = toPoint(transform(UTRECHT))
const feature = new Feature(geometry)

const iconSource = new VectorSource({ features: [feature] })
const iconLayer = new VectorLayer({ source: iconSource })
const tileLayer = new TileLayer({ source: new OSM({ url: tileUrl }) })
const view = new View({ zoom: 0, center: [0, 0] })

onMounted(() => {
  feature.setStyle(style)
  map.setLayers([tileLayer, iconLayer])
  map.setTarget(mapRef.value)
  map.setView(view)
  view.setCenter(transform(UTRECHT))
  view.setZoom(DEFAULT_ZOOM)
})

eventbus.on('message', (event) => {
  const coords = transform(event.gps.split('|').map((coordStr) => Number(coordStr)))
  if (props.locked) {
    view.setCenter(coords)
    view.animate({ zoom: DEFAULT_ZOOM, duration: 100, easing: easeOut })
  }
  geometry.setCoordinates(coords)
})

watch(props, setInteractability, { immediate: true })
</script>

<template>
  <div class="w-full h-full" ref="mapRef" />
</template>

<style lang="scss">
.ol-zoom {
  display: none;
}

.ol-attribution {
  display: none !important;
}
</style>
