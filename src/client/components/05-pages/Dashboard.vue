<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
import repository from '@/client/api/repository'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => repository.openWebsocket())
onUnmounted(() => repository.closeWebsocket())
</script>

<template>
  <Page title="Dashboard">
    <template v-slot:header>
      <h2>Watch the busses driving!</h2>
    </template>
    <template v-slot:content>
      <div>{{repository.loading}}</div>
    </template>
  </Page>
</template>
