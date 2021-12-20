import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  renameSync
} from 'fs'
import { join } from 'path'

import { load, dump } from 'js-yaml'

import { useCache } from './cache'
import { useElectron } from './electron'

const DefaultDatabasePath = 'target'
const DefaultDatabase = {
}

export function useDatabase() {
  if (!globalThis.database) globalThis.database = {
    setDBRootPath(path?: string) {
      globalThis.database.rootPath = path ? path : DefaultDatabasePath
      const avmdbFilePath = join(globalThis.database.rootPath, 'avmdb.yaml')
      globalThis.database.metaPath = avmdbFilePath
      if (!existsSync(avmdbFilePath)) writeFileSync(avmdbFilePath, dump(DefaultDatabase))
      globalThis.database.meta = load(readFileSync(avmdbFilePath, 'utf-8'))
    },
    recv(pkg: any) {
      const electron = useElectron()
      const cache = useCache()
      switch (pkg.cmd) {
        case 'GetInitDatabase':
          electron.sendPkg('SetInitDatabase', 'database')
          break;
        case 'NewFolder':
          const folderName = `【${pkg.data.code}】${pkg.data.title}`
          const videoFolderPath = join(cache.get()['CurrentDatabaseFolderPath'], folderName)
          if (!existsSync(videoFolderPath)) mkdirSync(videoFolderPath)
          electron.sendPkg('DoneNewFolder', 'database', {
            vid: pkg.data.vid,
            videoFolderPath
          })
          break;
        case 'TouchDatabaseFolder':
          this.setDBRootPath(pkg.data.path)
          break;
        case 'SaveCoverToFolder':
          let path = join(pkg.data.folderPath, `【${pkg.data.code}】${pkg.data.title}.jpg`)
          if (!existsSync(path)) writeFileSync(path, new Uint8Array(pkg.data.coverData))
          break;
        case 'MoveVideoToFolder':
          path = join(pkg.data.folderPath, `【${pkg.data.code}】${pkg.data.title}.mp4`)
          if (existsSync(pkg.data.videoPath) && !existsSync(path)) renameSync(pkg.data.videoPath, path)
          break;
        default:
          console.warn('PKG Loss:', pkg);
          break;
      }
    },
  }
  return globalThis.database
}