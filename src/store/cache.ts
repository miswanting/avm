import { Module } from "vuex";
import router from "../router";

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
    }
  },
  actions: {
    recv({ commit, dispatch }, pkg) {
      switch (pkg.cmd) {
        case 'SetInitCache':
          commit('overwrite', pkg.data)
          if (pkg.data.FirstRun) router.push('/first-run')
          // else router.push('/dashboard')
          else dispatch('net/send', {
            cmd: 'GetInitDatabase',
            scope: 'database',
          }, { root: true })
          break;
        case 'SetDatabaseFolder':
          dispatch('set', {
            key: 'CurrentDatabaseFolderPath',
            value: pkg.data.path,
          })
          dispatch('set', {
            key: 'CurrentDatabaseFolderPath',
            value: pkg.data.path,
          })
          // if (pkg.data.FirstRun) router.push('/first-run')
          // else router.push('/dashboard')
          break;
        default:
          break;
      }
    },
    set({ state, dispatch }, { key, value }) {
      state[key] = value
      dispatch('net/send', {
        cmd: 'SetCache',
        scope: 'cache',
        data: { key, value }
      }, { root: true })
    },
  },
} as Module<any, any>