<script setup lang="ts">
import { onMounted } from 'vue'
import { Chart, ChartTypeRegistry, registerables } from 'chart.js'

const props = defineProps<{
  id: string
  data: Vehicles.HistoryData[]
  key: keyof Omit<Vehicles.HistoryData, 'time'>
}>()

const labels = ['January', 'February', 'March', 'April', 'May', 'June']
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
}

const options = {
  responsive: true,
}

const config = {
  type: 'line' as keyof ChartTypeRegistry,
  data,
  options,
}

onMounted(() => {
  const element = document.getElementById(props.id) as HTMLCanvasElement
  Chart.register(...registerables)
  new Chart(element, config)
})
</script>

<template>
  <canvas class="w-full h-full" :id="id" />
</template>
