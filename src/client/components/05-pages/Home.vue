<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
</script>

<template>
  <Page title="test">
    <template v-slot:header>
      <div>Header</div>
    </template>
    <template v-slot:content>
      <div style="height: 150vh">Test</div>
    </template>
    <template v-slot:footer>
      <div>Footer</div>
    </template>
  </Page>
</template>
