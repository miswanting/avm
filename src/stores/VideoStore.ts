import { nanoid } from 'nanoid'
export default {
  namespaced: true,
  state: () => ({
    list: {}
  }),
  actions: {
    new({ state, dispatch, rootState }, video) {
      function parseCode(name) {
        const re = new RegExp(rootState.config.re, 'g');
        return name.match(re)
      }
      video.code = parseCode(video.name)
      const key = nanoid()
      state.list[key] = video;
      const cmd = {
        cmd: 'getVideoInfo',
        id: key,
        code: video.code
      }
      dispatch('net/send', cmd, { root: true })
      return key
    },

  }
}