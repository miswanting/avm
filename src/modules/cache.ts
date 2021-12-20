import {
  existsSync,
  readFileSync,
  writeFileSync
} from 'fs'
import { dump, load } from 'js-yaml'
import { useElectron } from './electron'

const DefaultCachePath = 'cache.yaml'
const DefaultCache = {
  FirstRun: true,
  CurrentDatabaseFolderPath: '',
}

export function useCache() {
  if (!globalThis.cache) globalThis.cache = {
    get() {
      if (globalThis.cache.data) return globalThis.cache.data
      if (!existsSync(DefaultCachePath)) writeFileSync(DefaultCachePath, dump(DefaultCache))
      globalThis.cache.data = load(readFileSync(DefaultCachePath, 'utf-8'))
      return load(readFileSync(DefaultCachePath, 'utf-8'))
    },
    set(key, value) {
      globalThis.cache.data[key] = value
      writeFileSync(DefaultCachePath, dump(globalThis.cache.data))
    },
    overwrite(data) {
      globalThis.cache.data = data
      writeFileSync(DefaultCachePath, dump(globalThis.cache.data))
    },
    recv(pkg) {
      const electron = useElectron()
      switch (pkg.cmd) {
        case 'GetInitCache':
          electron.send({
            cmd: 'SetInitCache',
            scope: 'cache',
            data: this.get()
          })
          break;
        case 'SetCache':
          globalThis.cache.set(pkg.data.key, pkg.data.value)
          break;
        default:
          console.warn('PKG Loss:', pkg);
          break;
      }
    }
  }
  return globalThis.cache
}