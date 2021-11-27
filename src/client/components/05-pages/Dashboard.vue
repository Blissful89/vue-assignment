<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import repository from '@/client/api/repository'
import eventbus from '@/client/utils/eventbus'
import Page from '@/client/components/04-templates/Page.vue'

import Grid from '@/client/components/03-organisms/Grid.vue'

onMounted(() => repository.openWebsocket())
onUnmounted(() => repository.closeWebsocket())

const timeString = ref('')
const setTime = (event: Vehicles.Data) => {
  timeString.value = new Date(event.time).toLocaleTimeString()
}

eventbus.on('message', setTime)
</script>

<template>
  <Page :title="$t('pages.dashboard.title')">
    <template v-slot:header>
      <h2>{{ $t('pages.dashboard.subtitle') }}</h2>
    </template>
    <template v-slot:header:end>
      <h2>
        {{ timeString }}
      </h2>
    </template>
    <template v-slot:content>
      <Grid />
    </template>
  </Page>
</template>
