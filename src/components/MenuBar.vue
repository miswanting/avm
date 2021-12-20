<style scoped lang="stylus">
.menu-bar
  display flex
  &>.menu-item
    display block
</style>
<template lang="pug">
.menu-bar
  MenuItem(v-for="i in menus" :data="i")
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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