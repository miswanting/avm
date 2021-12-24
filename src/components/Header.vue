<style scoped lang="stylus">
header
  display flex
  border-bottom 1px solid #0003
  height 1.5rem
  align-items center
  .title
    flex-grow 1
    justify-content center
    -webkit-app-region drag
    display flex
  &>div
    height 100%
    user-select none
    align-items center
  .minimize-button,
  .maximize-button,
  .close-button
    display flex
    padding 0 .25rem
    cursor pointer
    &:hover
      background-color #0003
  .close-button:hover
      background-color #f003
</style>
<template lang="pug">
header
  MenuItem(v-for="i in menus" :data="i")
  .title A.V.Manager
  .minimize-button(@click="store.dispatch('net/send', { cmd: 'MinimizeWindow', scope: 'electron' })")
    i.fas.fa-minus.fa-fw.fa-sm
  .maximize-button(@click="store.dispatch('net/send', { cmd: 'MaximizeWindow', scope: 'electron' })")
    i.fas.fa-plus.fa-fw.fa-sm
  .close-button(@click="store.dispatch('net/send', { cmd: 'CloseWindow', scope: 'electron' })")
    i.fas.fa-xmark.fa-fw.fa-sm
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import MenuBar from './MenuBar.vue'
import MenuItem from './MenuItem.vue'

const store = useStore()
const router = useRouter()

const menus = [
  {
    label: 'File',
    submenu: [
      { label: 'Exit' },
      {
        label: 'test',
        submenu: [
          { label: 'Exit' },
          { label: 'Exit' },
          { label: 'Exit' },
        ]
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Preferences',
        click() {
          router.push('/preferences')
        }
      },
    ]
  },
]
</script>