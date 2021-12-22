import { Module } from "vuex";
import { nanoid } from "nanoid";
import { useFfmpeg } from "../modules/ffmpeg";

export default {
  namespaced: true,
  state: () => ({
    convert: {
      todo: [],
      doing: [],
      done: [],
    },
    info: {
      todo: [],
      doing: [],
      done: [],
    },
    img: {
      todo: [],
      doing: [],
      done: [],
    },
    db: {},
  }),
  actions: {
    add({ state, dispatch }, vid) {
      state.convert.todo.push(vid)
      state.info.todo.push(vid)
      dispatch('update')
    },
    checkVideoToFolder({ dispatch, rootState }, options) {
      const vid = options.vid
      const video = rootState.video.list[vid]
      if (video.isFolderCreated && video.isConverted) {
        dispatch('net/send', {
          cmd: 'MoveVideoToFolder',
          scope: 'database',
          data: {
            vid,
            code: video.code,
            title: video.title,
            folderPath: video.folderPath,
            videoPath: video.tmpFilePath,
          },
        }, { root: true })
      }
    },
    checkCoverToFolder({ dispatch, rootState }, options) {
      const vid = options.vid
      const video = rootState.video.list[vid]
      if (video.isFolderCreated && video.isCoverLoaded) {
        dispatch('net/send', {
          cmd: 'SaveCoverToFolder',
          scope: 'database',
          data: {
            vid,
            code: video.code,
            title: video.title,
            folderPath: video.folderPath,
            coverData: video.coverData,
          },
        }, { root: true })
      }
    },
    update({ state, rootState, dispatch }) {
      if (state.convert.doing.length < rootState.config.ConvertParallelCount) {
        if (state.convert.todo.length > 0) {
          const vid = state.convert.todo.shift()
          state.convert.doing.push(vid)
          const video = rootState.video.list[vid]
          dispatch('net/send', {
            cmd: 'Probe',
            scope: 'ffmpeg',
            data: {
              vid,
              path: video.filePath,
            },
          }, { root: true })
        }
      }
      if (state.info.doing.length < rootState.config.InfoParallelCount) {
        if (state.info.todo.length > 0) {
          const vid = state.info.todo.shift()
          state.info.doing.push(vid)
          const video = rootState.video.list[vid]
          dispatch('net/send', {
            cmd: 'GetVideoInfo',
            scope: 'spider',
            data: {
              vid,
              code: video.code
            },
          }, { root: true })
        }
      }
      if (state.img.doing.length < rootState.config.ImgParallelCount) {
        if (state.img.todo.length > 0) {
          const vid = state.img.todo.shift()
          state.img.doing.push(vid)
          const video = rootState.video.list[vid]
          if (video.isInfoLoaded) {
            dispatch('net/send', {
              cmd: 'GetVideoCover',
              scope: 'spider',
              data: {
                vid,
                code: video.code,
                coverUrl: video.coverUrl,
              }
            }, { root: true })
          }
        }
      }
    },
    recv({ state, rootState, dispatch }, pkg) {
      switch (pkg.cmd) {
        case 'SetVideoFrames':
          rootState.video.list[pkg.data.vid].totalFrames = pkg.data.frames - 0
          dispatch('net/send', {
            cmd: 'ConvertToTemp',
            scope: 'ffmpeg',
            data: {
              vid: pkg.data.vid,
              path: rootState.video.list[pkg.data.vid].filePath,
            }
          }, { root: true })
          break;
        case 'SetTmpPath':
          rootState.video.list[pkg.data.vid].tmpFilePath = pkg.data.path
          break;
        case 'Update':
          rootState.video.list[pkg.data.vid].isConverting = true
          rootState.video.list[pkg.data.vid].currentFrames = pkg.data.progress - 0
          break;
        case 'Done':
          rootState.video.list[pkg.data.vid].isConverting = false
          rootState.video.list[pkg.data.vid].isConverted = true

          let vid = state.convert.doing.shift()
          state.convert.done.push(vid)
          dispatch('update')
          if (rootState.video.list[pkg.data.vid].isFolderCreated) {
            dispatch('checkVideoToFolder', {
              vid: pkg.data.vid,
            })
          }
          break;
        case 'SetVideoInfo':
          rootState.video.list[pkg.data.vid].isLoadingInfo = false
          rootState.video.list[pkg.data.vid].isInfoLoaded = true
          let title = pkg.data.title
          title = title.replace('*', '')
          rootState.video.list[pkg.data.vid].title = title
          rootState.video.list[pkg.data.vid].code = pkg.data.code
          rootState.video.list[pkg.data.vid].coverUrl = pkg.data.coverUrl
          rootState.video.list[pkg.data.vid].isLoadingCover = true

          vid = state.info.doing.shift()
          state.info.done.push(vid)
          state.img.todo.push(vid)
          dispatch('update')

          break;
        case 'SetVideoCover':
          rootState.video.list[pkg.data.vid].isCoverLoaded = true
          rootState.video.list[pkg.data.vid].coverData = pkg.data.res

          vid = state.img.doing.shift()
          state.img.done.push(vid)
          dispatch('update')

          if (rootState.video.list[pkg.data.vid].isFolderCreated) {
            dispatch('checkCoverToFolder', {
              vid: pkg.data.vid,
            })
          }
          break;
        default:
          break;
      }
    },
  },
} as Module<any, any>