<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
import repository from '@/client/api/repository'
import useLocales from '@/client/compositions/useLocales'
import { onMounted, onUnmounted } from 'vue'

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
      <div>{{ repository.loading }}</div>
    </template>
  </Page>
</template>
