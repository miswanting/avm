<template lang="pug">
.container
  .box(v-for="(v, k) in store.state.video.list")
    .progress.has-background-primary(
      :style="{ width: v.done ? '100%' : ((v.progress / v.frames) * 100).toFixed(0) + '%' }"
    )
    .info
      .content
        p
          span {{ v.name }}
        p
          span {{ v.code }}
          span &ensp;
          span(v-if="v.title") {{ v.title }}
          i.fas.fa-spinner.fa-pulse(v-else)
        p
          span(v-if="v.actors.length > 0") {{ v.actors }}
    .image
      img(v-if="v.cover", :src="getImg(v.cover)")
  .box.add
    i.fas.fa-plus
</template>
<style lang="stylus" scoped>
.box
  display flex
  position relative
  min-height 144px

  .progress
    position absolute
    top 0
    left 0
    width 0%
    height 100%
    border-radius 6px

  .info
    flex-grow 1
    z-index 1

  img
    height 104px
    border-radius 6px

  &.add
    display grid
    place-items center
</style>
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const img = ref();
function getImg(v) {
  if (v) {
    const bytes = new Uint8Array(v);
    const blob = new Blob([bytes], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  }
  return null;
}
function click(v) {
  // const ctx = img.value.getContext("2d");
  // ctx.drawImage(v.cover, 0, 0);
  // const b = new Uint8Array(v.cover);
  // console.log(btoa(v));
}

function test(a) {
  return ``;
}
function getPath(p: any) {
  return `${p.dir}\\${p.base}`;
}
function b64(d: any) {
  console.log(img.value);
}
</script>
