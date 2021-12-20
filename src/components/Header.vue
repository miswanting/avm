<style scoped lang="stylus">
header
  display flex
  border-bottom 1px solid #0003
  font-family monospace
  backdrop-filter blur(3px)
  .title-bar 
    flex-grow 1
    text-align center
    -webkit-app-region drag
  .window-bar 
    display flex
    div
      padding 0 .5rem
      cursor pointer
      display flex
      align-items center
      &:hover
        background #0003
</style>
<template lang="pug">
header
  MenuBar
  .title-bar A.V.Manager
  .window-bar 
    div(@click="store.dispatch('net/send', { cmd: 'MinimizeWindow', scope: 'electron' })")
      i.fa-regular.fa-window-minimize.fa-fw.fa-sm
    div(@click="store.dispatch('net/send', { cmd: 'MaximizeWindow', scope: 'electron' })")
      i.fa-regular.fa-window-maximize.fa-fw.fa-sm
    div(@click="store.dispatch('net/send', { cmd: 'CloseWindow', scope: 'electron' })")
      i.fa-regular.fa-rectangle-xmark.fa-fw.fa-sm
</template>
<script setup lang="ts">
import { useStore } from 'vuex'

import MenuBar from './MenuBar.vue'

const store = useStore()
</script>