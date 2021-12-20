<style scoped lang="stylus">
.header
  display flex
  border-bottom 1px solid #0003
  &>div
    padding .5rem
  .back
    display flex
    align-items center
    &:hover
      background #0003
      cursor pointer
main
  margin .5rem 10%
  p
    display flex
    align-items center
    input
      margin-left .5rem
    select
      margin-left .5rem
</style>
<template lang="pug">
Header
.header
  .back(@click="router.back()")
    i.fa-solid.fa-chevron-left.fa-fw.fa-sm
  div Perferences
main
  p
    label(for="language") Language:
    select(id="language" v-model="language")
      option(value="en-US") English
      option(value="zh-CN") 简体中文
      option(value="zh-TW") 繁体中文
      option(value="ja-JP") 日本語
    div {{ language }}
  p
    label Theme:
    input(type="radio" name="theme" value="auto" id="theme-auto" disabled)
    label(for="theme-auto") Auto
    input(type="radio" name="theme" value="light" id="theme-light" checked)
    label(for="theme-light") Light
    input(type="radio" name="theme" value="dark" id="theme-dark" disabled)
    label(for="theme-dark") Dark
  p
    label Database Folder Path: 
    a(href="#" @click="setDFP") {{ store.state.config.databaseFolderPath ? store.state.config.databaseFolderPath : 'Empty' }}
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Header from '../components/Header.vue'

const store = useStore()
const router = useRouter()

const language = ref('')

function setDFP(e) {
  e.preventDefault()
  store.dispatch('net/send', {
    cmd: 'showSetDBFolderPathDialog',
  })
}
</script>