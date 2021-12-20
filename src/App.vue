<template lang="pug">
RouterView
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'
import { useIpcRendererOn } from '@vueuse/electron'

const store = useStore()

useIpcRendererOn('pkg', (e, pkg) => {
  store.dispatch('net/recv', pkg)
})
</script>