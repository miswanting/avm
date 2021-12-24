<style scoped lang="stylus">
main
  padding 0 10%
  h1
    text-align center
.flex
  display flex
  input
    flex-grow 1
</style>

<template lang="pug">
Header
main
  h1 Welcome!
  div.flex
    button(@click="store.dispatch('net/send', { cmd: 'ShowSetDatabaseFolderDialog', scope: 'electron' })") Open
    input(v-model="store.state.cache.CurrentDatabaseFolderPath")
  div.flex
    button(@click="next") Next
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Button from '../components/Button.vue'
const store = useStore()
const router = useRouter()
function next() {
  store.dispatch('cache/set', { key: 'FirstRun', value: false })
  router.replace('/dashboard')
}
</script>