<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/client/store/state'
import Dropdown from 'primevue/dropdown'

const store = useStore<RootState>()

const languages = computed(() => store.state.locale.options)
const selection = computed({
  get() {
    return store.state.locale.value
  },
  set(e: string) {
    store.commit('locale/SET_VALUE', e)
  },
})
</script>

<template>
  <Dropdown v-model="selection" :options="languages" optionLabel="name" optionValue="code" />
</template>

<style lang="scss" scoped>
.p-dropdown {
  width: 10rem;
}
</style>
