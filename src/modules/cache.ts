import { dump, load } from 'js-yaml'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const DefaultCachePath = 'cache.yaml'
const DefaultCache = {
  FirstRun: true
}

export function useCache() {
  if (!globalThis.cache) globalThis.cache = {
    get() {
      if (!existsSync(DefaultCachePath)) writeFileSync(DefaultCachePath, dump(DefaultCache))
      return load(readFileSync(DefaultCachePath, 'utf-8'))
    },
    set(data) {
      writeFileSync(DefaultCachePath, dump(data))
    },
  }
  return globalThis.cache
}