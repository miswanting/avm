<template lang="pug">
Header
button(@click="store.dispatch('net/send', { cmd: 'ShowSetDatabaseFolderDialog', scope: 'electron' })") Set DB Folder
button(@click="next") Next
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
const store = useStore()
const router = useRouter()
function next() {
  store.dispatch('cache/set', { key: 'FirstRun', value: false })
  router.replace('/dashboard')
}
</script>