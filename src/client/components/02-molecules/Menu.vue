<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import useLocales from '@/client/compositions/useLocales'
import LanguageSelect from '../01-atoms/LanguageSelect.vue'

const { t } = useLocales()

const items = ref([
  {
    label: t('pages.home.title'),
    icon: 'pi pi-home',
    to: {
      name: 'Home',
    },
  },
  {
    label: t('pages.dashboard.title'),
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
      <LanguageSelect />
    </template>
  </Menubar>
</template>
