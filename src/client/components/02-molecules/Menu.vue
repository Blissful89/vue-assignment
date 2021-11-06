<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: {
      name: 'Home',
    },
  },
  {
    label: 'Dashboard',
    icon: 'pi pi-desktop',
    to: {
      name: 'Dashboard',
    },
  },
])
</script>

<template>
  <Menubar :model="items" class="sticky top-0 z-5 surface-50 shadow-1 border-50 px-3 gap-3">
    <template v-slot:start>
      <img alt="logo" src="assets/logo.png" height="40" />
    </template>
    <template v-slot:end>
      <!--  -->
    </template>
  </Menubar>
</template>
