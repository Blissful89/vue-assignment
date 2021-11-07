<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Menu from '@/client/components/02-molecules/Menu.vue'
import eventbus from '@/client/utils/eventbus'
import uselocales from '@/client/compositions/useLocales'

const toast = useToast()
const { t } = uselocales()

eventbus.on('error', (e) =>
  toast.add({
    severity: 'error',
    summary: t('error.general'),
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
