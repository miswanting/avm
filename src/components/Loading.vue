<style scoped lang="stylus">
svg
  display inline
  width 1rem
  height 1rem
  animation spin 1s linear infinite
  @keyframes spin 
    from 
      transform rotate(0)
    to 
      transform rotate(360deg)
</style>

<template lang="pug">
svg(width="100" height="100" viewBox="0 0 100 100")
  path(d="M 50 0 A 50 50 1 1 1 0 50 L 10 50 A 40 40 1 1 0 50 10 Z")
</template>

<script setup lang="ts">
</script>