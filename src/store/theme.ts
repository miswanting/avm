import { Module } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    dark: false
  }),
} as Module<any, any>