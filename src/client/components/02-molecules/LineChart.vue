<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Chart, ChartTypeRegistry, registerables } from 'chart.js'
import get from 'lodash/get'
import eventbus from '@/client/utils/eventbus'
import uselocales from '@/client/compositions/useLocales'

const MAX_ITEMS = 500
const UPDATE_START_1 = 1500
const UPDATE_START_2 = 5000
const UPDATE_INTERVAL = 10_000

const props = defineProps<{ id: string; itemKey: keyof Vehicles.Data }>()
const { t, locale } = uselocales()

const getLabel = (value: any) => {
  const parsedValue = get(value, 'formattedValue') ?? value

  const isMetric = locale.value !== 'en'
  const isSpeed = props.itemKey === 'speed'
  const resultValue = isMetric || !isSpeed ? parsedValue : Math.round(parsedValue / 1.6)

  switch (props.itemKey) {
    case 'speed':
      return `${resultValue} ${t('general.speed')}`
    default:
      return `${resultValue}`
  }
}

const getTooltipTitle = (value: any) => {
  const time = get(value, '[0].label')
  const date = new Date(parseInt(time))
  return date.toLocaleString()
}

const addPoint = (chart: Chart, item: Vehicles.Data) => {
  const { labels, datasets } = chart.data
  const { data } = datasets[0]
  if (labels && data.length > MAX_ITEMS) {
    labels.shift()
    data.shift()
  }

  labels?.push(item.time)
  data.push(item[props.itemKey] as number)
}

const data = {
  labels: [],
  datasets: [{ data: [], fill: false, borderColor: '#7BA563', tension: 0.5 }],
}

const options = {
  maintainAspectRatio: false,
  scales: { x: { display: false }, y: { ticks: { callback: getLabel } } },
  elements: { point: { radius: 0, hitRadius: 50 } },
  plugins: {
    legend: { display: false },
    tooltip: { displayColors: false, callbacks: { label: getLabel, title: getTooltipTitle } },
  },
}

const config = {
  type: 'line' as keyof ChartTypeRegistry,
  data,
  options,
}

let chart: Chart
onMounted(() => {
  const ctx = document.getElementById(props.id) as HTMLCanvasElement

  Chart.register(...registerables)
  chart = new Chart(ctx, config as any)
  eventbus.on('message', (event) => addPoint(chart, event))
})

setTimeout(() => chart.update(), UPDATE_START_1)
setTimeout(() => chart.update(), UPDATE_START_2)
let interval = setInterval(() => chart.update(), UPDATE_INTERVAL)

watch(locale, () => {
  clearInterval(interval)
  chart.update()
  interval = setInterval(() => chart.update(), UPDATE_INTERVAL)
})
</script>

<template>
  <canvas class="line-chart" style="height: 100%; width: 100%" :id="id" />
</template>

<style lang="scss">
.line-chart {
  /* background-color: var(--surface-50); */
}
</style>
