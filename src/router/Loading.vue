<template lang="pug">
div Loading...
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  const store = useStore()

  // if (window.matchMedia('(prefers-color-scheme: dark)').matches) store.state.theme.dark = true
  // else store.state.theme.dark = false

  store.dispatch('net/send', {
    cmd: 'GetInitConfig',
    scope: 'config',
  })
})
</script>