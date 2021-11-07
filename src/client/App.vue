<script setup lang="ts">
import Toast from 'primevue/toast'
import Menu from '@/client/components/02-molecules/Menu.vue'
import eventbus from '@/client/utils/eventbus'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

eventbus.on('error', (e) =>
  toast.add({
    severity: 'error',
    summary: 'The following error occurred',
    detail: e.message,
    life: 3000,
  }),
)
</script>

<template>
  <Menu />
  <router-view></router-view>
  <Toast />
</template>
