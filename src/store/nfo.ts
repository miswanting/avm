import { Module } from "vuex";
import router from "../router";
import cheerio from 'cheerio'
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
    test({ }, data) {
      const $ = cheerio.load(`<movie></movie>`, { xmlMode: true })
      $('movie').append(`<title>${data.title}</title>`)
      console.log($.xml());
      console.log($.html());
    },
    recv({ commit, dispatch }, pkg) {
      switch (pkg.cmd) {
        case 'SetInitCache':
          commit('overwrite', pkg.data)
          if (pkg.data.FirstRun) router.push('/first-run')
          else router.push('/dashboard')
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
  },
} as Module<any, any>