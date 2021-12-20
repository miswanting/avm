import { ipcRenderer } from "electron"

export default {
  namespaced: true,
  state: () => ({
    connectTestStatus: null,
  }),
  actions: {
    test({ state, dispatch }) {
      state.connectTestStatus = 0
      dispatch('send', {
        cmd: 'testConnection'
      })
    },
    send({ }, pkg) {
      console.log('Send:', pkg);
      ipcRenderer.send('pkg', pkg)
    },
    recv({ rootState, state, dispatch }, pkg) {
      console.log('Recv:', pkg);
      if (pkg.cmd === 'setVideoInfo') {
        rootState.video.list[pkg.id].code = pkg.code
        rootState.video.list[pkg.id].coverPath = pkg.coverPath
        rootState.video.list[pkg.id].title = pkg.title
        rootState.video.list[pkg.id].release = pkg.release
        rootState.video.list[pkg.id].director = pkg.director
        rootState.video.list[pkg.id].producer = pkg.producer
        rootState.video.list[pkg.id].publisher = pkg.publisher
        rootState.video.list[pkg.id].series = pkg.series
        rootState.video.list[pkg.id].actors = pkg.actors
        dispatch('send', {
          cmd: 'getVideoCover',
          id: pkg.id,
          coverPath: pkg.coverPath
        })
        dispatch('send', {
          cmd: 'getVideoFrames',
          id: pkg.id,
          dir: rootState.video.list[pkg.id].dir,
          base: rootState.video.list[pkg.id].base,
        })
      } else if (pkg.cmd === 'setVideoCover') {
        rootState.video.list[pkg.id].cover = pkg.data
      } else if (pkg.cmd === 'setVideoFrames') {
        rootState.video.list[pkg.id].frames = pkg.frames
        dispatch('send', {
          cmd: 'convert',
          id: pkg.id,
          dir: rootState.video.list[pkg.id].dir,
          base: rootState.video.list[pkg.id].base,
          filename: `[${rootState.video.list[pkg.id].code}] ${rootState.video.list[pkg.id].title}`
        })
      } else if (pkg.cmd === 'updateProgress') {
        rootState.video.list[pkg.id].progress = pkg.progress
      } else if (pkg.cmd === 'convertDone') {
        rootState.video.list[pkg.id].done = true
      } else if (pkg.cmd === 'setConfig') {
        for (const key in pkg.data) {
          if (Object.prototype.hasOwnProperty.call(pkg.data, key)) {
            rootState.config[key] = pkg.data[key];
          }
        }
      } else if (pkg.cmd === 'testResult') {
        if (pkg.value) {
          state.connectTestStatus = 1;
        } else {
          state.connectTestStatus = -1;
        }
        setTimeout(() => {
          state.connectTestStatus = null
        }, 5000)
      }
    }
  }
}