import { Module } from "vuex";
export default {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {
    overwrite(state, newState) {
      for (const key in newState) {
        if (Object.prototype.hasOwnProperty.call(newState, key)) {
          state[key] = newState[key];
        }
      }
    },
  },
  actions: {
    recv({ commit, dispatch }, pkg) {
      switch (pkg.cmd) {
        case 'SetInitConfig':
          commit('overwrite', pkg.data)
          dispatch('net/send', {
            cmd: 'GetInitCache',
            scope: 'cache',
          }, { root: true })
          break;
        default:
          break;
      }
    },
    set({ state, dispatch }, { key, value }) {
      state[key] = value
      dispatch('send/net', {
        cmd: 'SetConfig',
        scope: 'config',
        data: { key, value }
      }, { root: true })
    }
  },
} as Module<any, any>