<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@/client/components/02-molecules/Menu.vue'
import repository from '@/client/api/repository'

const cb = (e: any) => console.log(e)
const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  isOpen.value ? repository.onmessage(cb) : repository.close()
  console.log(repository.isOpen());
}

</script>

<template>
  <button @click="toggle">Toggle Messages</button>
  <Menu />
  <router-view></router-view>
</template>
