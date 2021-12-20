import { dirSync } from 'tmp'
export function useTmp() {
  if (!globalThis.tmp) globalThis.tmp = {
    get() {
      if (!globalThis.tmp.dir) globalThis.tmp.dir = dirSync()
      return globalThis.tmp.dir
    }
  }
  return globalThis.tmp
}