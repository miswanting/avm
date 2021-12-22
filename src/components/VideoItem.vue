<style scoped lang="stylus">
main
  font-family monospace
  .video-item
    margin 1rem
    border-radius .5rem
    border 1px solid #0003
    display flex
    .video-info
      flex-grow 1
      padding .5rem
      div
        display flex
      .video-code
        background #0003
        padding 0 .5rem
      .video-title
        font-weight bold
        margin-left .25rem
    .video-cover
      border-left 1px solid #0003
      min-width 143px
      position relative
      img
        max-height 96px
        width auto
      .video-cover-mask
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        display grid
        place-items center
        backdrop-filter blur(1px)brightness(.5)
    .video-actions
      border-left 1px solid #0003
      div
        padding .5rem
        text-align-last center
        display grid
        cursor pointer
        &:hover
          background #0003
        i
          display contents
</style>
<template lang="pug">
.video-item
  .video-info
    .video-local-bar
      CodeInput(v-model="code")
      .video-file-name {{ video.fileName }}
    .video-remote-bar
      i.fa-solid.fa-spinner.fa-spin-pulse(v-if="!video.isInfoLoaded")
      .video-code {{ video.code }}
      .video-title {{ video.title }}
      CircleProgress(:value="video.currentFrames" :max="video.totalFrames")
    .video-tag-bar
  .video-cover
    img(:src="getImageData(video.coverData)")
    .video-cover-mask(v-if="!video.isCoverLoaded")
      i.fa-solid.fa-spinner.fa-spin-pulse
  .video-actions
    .video-refresh(@click="refresh")
      i.fas.fa-arrows-rotate.fa-fw
    .video-submit(@click="submit")
      i.fas.fa-check.fa-fw
    //- .video-convert-all(@click="test")
    //-   i.fas.fa-forward.fa-fw
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import CodeInput from '../components/CodeInput.vue'
import CircleProgress from './CircleProgress.vue'
const store = useStore()
const props = defineProps(['vid'])
const video = store.state.video.list[props.vid]
const code = ref(video.fileCode)
function refresh() {
  store.state.video.list[props.vid].isCoverLoaded = false
  store.state.video.list[props.vid].fileCode = code.value
  store.dispatch('task/add', props.vid)
}
// function submit() {
//   store.dispatch('database/addVideo', {
//     name: props.vid,
//   })
// }
function submit() {
  store.state.video.list[props.vid].isSubmited = true
  store.dispatch('database/newFolder', {
    vid: props.vid
  })
}
const getImageData = (imageData) => {
  if (imageData) {
    const bytes = new Uint8Array(imageData);
    const blob = new Blob([bytes], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  }
  return null;
}
</script>