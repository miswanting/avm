<style scoped lang="stylus">
.menu-item
  height 100%
  .menu-button
    padding 0 .25rem
    cursor pointer
    height 100%
    display flex
    align-items center
    &:hover
      background #0003
  .menu-anchor
    .menu-container
      position absolute
      backdrop-filter blur(3px)
</style>
<template lang="pug">
.menu-item(ref="self")
  .menu-button(@click="click") {{ t(props.data.label) }}
  .menu-anchor(v-if="props.data.submenu && show")
    .menu-container
      MenuItem(v-for="v in props.data.submenu" :data="v" @click="clickChild")
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
const { t } = useI18n()
const props = defineProps(['data'])
const show = ref(false)
const emits = defineEmits(['click'])
function click() {
  if (props.data.click) {
    props.data.click()
  }
  if (props.data.submenu) {
    show.value = !show.value
    emits('click', false)
  }
  else emits('click', true)
}
function clickChild(isButton) {
  if (isButton) show.value = false
  emits('click', isButton)
}
const self = ref()
onClickOutside(self, (e) => {
  show.value = false
})
</script>