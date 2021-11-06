<script setup lang="ts">
import Page from '@/client/components/04-templates/Page.vue'
</script>

<template>
  <Page title="Dashboard">
    <template v-slot:header>
      <h2>Watch the busses driving!</h2>
    </template>
    <template v-slot:content>
      <div>Test</div>
    </template>
    <template v-slot:footer>
      <div>Footer</div>
    </template>
  </Page>
</template>
