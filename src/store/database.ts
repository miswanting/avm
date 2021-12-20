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
    recv({ dispatch, rootState }, pkg) {
      switch (pkg.cmd) {
        case 'SetInitDatabase':
          router.push('/dashboard')
          break;
        case 'SetDatabaseFolder':
          dispatch('cache/set', {
            key: 'CurrentDatabaseFolderPath',
            value: pkg.data.path,
          }, { root: true })
          dispatch('net/send', {
            cmd: 'TouchDatabaseFolder',
            scope: 'database',
            data: {
              path: pkg.data.path
            }
          }, { root: true })
          break;
        case 'DoneNewFolder':
          rootState.video.list[pkg.data.vid].isFolderCreated = true
          rootState.video.list[pkg.data.vid].folderPath = pkg.data.videoFolderPath
          // CheckVideoToFolder
          dispatch('task/checkVideoToFolder', {
            vid: pkg.data.vid,
          }, { root: true })
          // CheckCoverToFolder
          dispatch('task/checkCoverToFolder', {
            vid: pkg.data.vid,
          }, { root: true })
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
    newFolder({ rootState, dispatch }, options) {
      dispatch('net/send', {
        cmd: 'NewFolder',
        scope: 'database',
        data: {
          vid: options.vid,
          code: rootState.video.list[options.vid].code,
          title: rootState.video.list[options.vid].title,
        },
      }, { root: true })
    }
  },
} as Module<any, any>