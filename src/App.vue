<template lang="pug">
nav.navbar
  .navbar-brand
    .navbar-item A.V.Manager
    a.navbar-burger(@click="showMenu = !showMenu")
      span
      span
      span
  .navbar-menu(:class="{ 'is-active': showMenu }")
    .navbar-start
      a.navbar-item(@click="$router.push('/')") 列表
      a.navbar-item(@click="$router.push('/config')") 设置
RouterView
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const showMenu = ref(false);
onMounted(() => {
  store.dispatch("net/send", {
    cmd: "getConfig",
  });
});
</script>
