<style scoped lang="stylus">
svg
  display inline
  width 1rem
  height 1rem
</style>

<template lang="pug">
svg(width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg")
  circle(r="50" cx="50" cy="50" fill="gray")
  path(:d="`M 50 50 L 50 0 A 50 50 0 ${largeArcFlag} 1 ${x} ${y} Z`" fill="lime")
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['value', 'max'])
const max = computed(() => { return props.max ? props.max : 100 })
const present = computed(() => { return props.value / max.value })
const largeArcFlag = computed(() => { return present.value > .5 ? 1 : 0 })
const x = computed(() => { return 50 + 50 * Math.sin(present.value * 2 * Math.PI) })
const y = computed(() => { return 50 - 50 * Math.cos(present.value * 2 * Math.PI) })
</script>