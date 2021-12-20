import { ipcRenderer } from "electron"
// import router from '../router'
export default {
  namespaced: true,
  state: () => ({}),
  actions: {
    send({ }, pkg) {
      console.log('Send:', pkg);
      ipcRenderer.send('pkg', pkg)
    },
    recv({ dispatch }, pkg) {
      console.log('Recv:', pkg);
      if (pkg.scope) dispatch(`${pkg.scope}/recv`, pkg, { root: true })
      else console.warn('PKG Loss:', pkg);

      // switch (pkg.cmd) {
      // case 'SetInitConfig':
      //   for (const key in pkg.data) {
      //     if (Object.prototype.hasOwnProperty.call(pkg.data, key)) {
      //       rootState.config[key] = pkg.data[key];
      //     }
      //   }
      //   dispatch('send', {
      //     cmd: 'GetInitCache'
      //   })
      //   break;
      // case 'SetInitCache':
      //   for (const key in pkg.data) {
      //     if (Object.prototype.hasOwnProperty.call(pkg.data, key)) {
      //       rootState.config[key] = pkg.data[key];
      //     }
      //   }
      //   router.push('/dashboard')
      //   break;
      // case 'setVideoInfo':
      //   rootState.video.list[pkg.id].code = pkg.code
      //   rootState.video.list[pkg.id].coverUrl = pkg.coverUrl
      //   rootState.video.list[pkg.id].coverPath = pkg.coverUrl
      //   rootState.video.list[pkg.id].title = pkg.title
      //   rootState.video.list[pkg.id].isInfoLoaded = true
      //   dispatch('send', {
      //     cmd: 'getVideoCover',
      //     id: pkg.id,
      //     coverUrl: pkg.coverUrl
      //   })
      //   dispatch('send', {
      //     cmd: 'getVideoFrames',
      //     id: pkg.id,
      //   })
      //   break;
      // case 'setVideoCover':
      //   rootState.video.list[pkg.id].coverData = pkg.data
      //   rootState.video.list[pkg.id].isCoverLoaded = true
      //   break;
      // case 'setVideoFrames':
      //   rootState.video.list[pkg.id].frames = pkg.frames
      //   dispatch('send', {
      //     cmd: 'convert',
      //     id: pkg.id,
      //     filename: `[${rootState.video.list[pkg.id].code}] ${rootState.video.list[pkg.id].title}`
      //   })
      //   break;
      // case 'updateProgress':
      //   rootState.video.list[pkg.id].progress = pkg.progress
      //   break;
      // case 'convertDone':
      //   rootState.video.list[pkg.id].done = true
      //   break;
      // case 'setConfig':
      //   for (const key in pkg.data) {
      //     if (Object.prototype.hasOwnProperty.call(pkg.data, key)) {
      //       rootState.config[key] = pkg.data[key];
      //     }
      //   }
      //   break;
      // case 'testResult':
      //   if (pkg.value) {
      //     state.connectTestStatus = 1;
      //   } else {
      //     state.connectTestStatus = -1;
      //   }
      //   setTimeout(() => {
      //     state.connectTestStatus = null
      //   }, 5000)
      //   break;
      // case 'setDBFolderPathDialog':
      //   if (pkg.data) {
      //     dispatch('config/set', {
      //       key: 'databaseFolderPath',
      //       value: pkg.data[0]
      //     },
      //       { root: true })
      //   }
      //   break;
      // default:
      //   break;
    }
  }
}