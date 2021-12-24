<template lang="pug">
div Loading...
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  const store = useStore()
  store.dispatch('net/send', {
    cmd: 'GetInitConfig',
    scope: 'config',
  })
})
</script>