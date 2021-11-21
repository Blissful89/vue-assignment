<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Chart, ChartTypeRegistry, registerables } from 'chart.js'

const props = defineProps<{
  id: string
  data: Vehicles.HistoryData[]
}>()

const setPoints = (chart: Chart, items: Vehicles.HistoryData[], set = 0) => {
  chart.data.labels = []
  chart.data.datasets[0].data = []
  items.forEach((item) => {
    chart.data.labels?.push(item.time)
    chart.data.datasets[set].data.push(item.speed)
  })
  chart.update()
}

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      fill: false,
      borderColor: '#7BA563',
      tension: 0.1,
    },
  ],
}

const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      // display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
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
})

watch(props, () => {
  if (chart) {
    setPoints(chart, props.data)
  }
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
