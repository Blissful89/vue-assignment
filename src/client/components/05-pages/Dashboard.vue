<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
import repository from '@/client/api/repository'
import useLocales from '@/client/compositions/useLocales'
import { onMounted, onUnmounted } from 'vue'

import Grid from '@/client/components/03-organisms/Grid.vue'

const { t } = useLocales()

onMounted(() => repository.openWebsocket())
onUnmounted(() => repository.closeWebsocket())
</script>

<template>
  <Page :title="t('pages.dashboard.title')">
    <template v-slot:header>
      <h2>{{ t('pages.dashboard.subtitle') }}</h2>
    </template>
    <template v-slot:content>
      <Grid />
    </template>
  </Page>
</template>
