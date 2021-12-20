import { parse, stringify } from '@iarna/toml'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const DefaultConfigPath = 'config.toml'
const DefaultConfig = {
  Locale: 'en-US',
  Theme: 'light',
}

export function useConfig() {
  if (!globalThis.config) globalThis.config = {
    get() {
      if (!existsSync(DefaultConfigPath)) writeFileSync(DefaultConfigPath, stringify(DefaultConfig))
      return parse(readFileSync(DefaultConfigPath, 'utf-8'))
    },
    set(data) {
      writeFileSync(DefaultConfigPath, stringify(data))
    },
  }
  return globalThis.config
}