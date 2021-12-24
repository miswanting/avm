<style scoped lang="stylus">
.header
  display flex
  border-bottom 1px solid #0003
  &>div
    display flex
    align-items center
    border-right 1px solid #0003
    padding 0 .25rem
    cursor pointer
    &:hover
      background #0003
main
  overflow-y auto
  font-family: monospace
  .video-item
    margin 1rem
    border-radius .5rem
    border 1px solid #0003
    display flex
    .video-info
      flex-grow 1
      .video-local-bar
        display flex
    .video-actions
      border-left 1px solid #0003
      div
        padding .5rem
        text-align-last center
        display grid
        i
          display contents
</style>

<template lang="pug">
Header
.header
  div
    i.fas.fa-play.fa-fw.fa-xs
    .name Start
  div
    i.fas.fa-sync.fa-fw.fa-xs.fa-spin
    .name Auto Convert
main
  VideoItem(v-for="v,k in store.state.video.list" :vid="k")
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'

import Header from '../components/Header.vue'
import VideoItem from '../components/VideoItem.vue'
import CodeInput from '../components/CodeInput.vue'
import CircleProgress from '../components/CircleProgress.vue'
import Loading from '../components/Loading.vue'

const store = useStore()

useEventListener(document, 'dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
})

useEventListener(document, 'drop', (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.dataTransfer.files) {
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      store.dispatch('video/new', e.dataTransfer.files[i].path)
    }
  }
})
</script>