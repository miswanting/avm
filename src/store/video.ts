import { parse } from "path";
import { Module } from 'vuex'
import { nanoid } from 'nanoid'

export default {
  namespaced: true,
  state: () => ({
    list: {}
  }),
  actions: {
    new({ state, dispatch, rootState }, path) {
      const video = {
        // Abstract Info
        id: nanoid(),
        // Flag
        isLoadingInfo: true,
        isInfoLoaded: false, // Found Info
        isCreatingFolder: false,
        isFolderCreated: false,
        isLoadingFrame: false,
        isFrameLoaded: false,
        isConverting: false, // Converting in Progress
        isConverted: false,
        isMovingFile: false,
        isFileMoved: false,
        isLoadingCover: false,
        isCoverLoaded: false, // Downloaded Cover
        isSavingCover: false,
        isCoverSaved: false,
        isSubmited: false,
        // Local Path
        filePath: path,
        tmpFilePath: null,
        folderPath: null, // DatabasePath + Generated Folder Name
        // coverPath: null, // Cover File Path
        // Local Info
        fileCode: null, // Extract Directly From File Name
        fileName: parse(path).name,
        // Remote Info
        code: null, // True Code, Update Online
        title: null, // title of the Video
        coverUrl: null,
        // Binary Data
        coverData: null, // Image Data for Display
        // Progress Info
        currentFrames: 0,
        totalFrames: 0,
      }
      function extractCode(name) {
        const re = new RegExp(rootState.config.Re, 'g');
        return re.exec(name)
      }
      const tmpCode = extractCode(video.fileName)
      video.fileCode = `${tmpCode[1]}-${tmpCode[2]}`.toUpperCase()
      video.code = video.fileCode // First Try
      state.list[video.id] = video;
      ///////////////////////////////////////////
      dispatch('task/add', video.id, { root: true })
      ///////////////////////////////////////////
      // dispatch('search', video.id)
      // return video.id
    },
    search({ state, dispatch }, id: string) {
      const video = state.list[id]
      dispatch('net/send', {
        cmd: 'addVideo',
        id: video.id,
        data: JSON.parse(JSON.stringify(video)),
      }, { root: true })
    },
    submitVideoInfo({ state, dispatch }, vid: string) {
      const video = state.list[vid]
      dispatch('net/send', {
        cmd: 'addVideo',
        id: video.id,
        data: JSON.parse(JSON.stringify(video)),
      }, { root: true })
    }
  }
} as Module<any, any>