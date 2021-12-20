<style scoped lang="stylus">
.code-input
  font-weight bold
  .input
    min-width 4rem
    display inline-block
    outline none
    text-align center
    text-decoration underline
</style>
<template lang="pug">
.code-input
  span [
  span.input(ref="input" @input="inputR" ,contenteditable) {{ props.modelValue }}
  span ]
</template>
<script setup lang="ts">
import { ref } from 'vue'
const input = ref()
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const inputR = () => {
  emits('update:modelValue', input.value.innerText)
}
</script>