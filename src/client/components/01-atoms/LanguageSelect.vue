<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'

const languages = ref([
  { name: 'Nederlands', code: 'nl' },
  { name: 'Engels', code: 'en' },
])

const selection = ref(languages.value[0].code)
</script>

<template>
  <Dropdown v-model="selection" :options="languages" optionLabel="name" optionValue="code" />
</template>

<style lang="scss" scoped>
.p-dropdown {
  width: 10rem;
}
</style>
