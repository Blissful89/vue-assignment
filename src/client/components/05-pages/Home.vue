<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
</script>

<template>
  <Page :title="$t('pages.home.title')">
    <template v-slot:header>
      <h2>{{ $t('pages.home.subtitle') }}</h2>
    </template>
    <template v-slot:content>
      Nothing to see here. Move along!
    </template>
  </Page>
</template>
