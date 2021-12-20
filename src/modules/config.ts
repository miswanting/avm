import { existsSync, readFileSync, writeFileSync } from 'fs'
import { parse, stringify } from '@iarna/toml'
import { useElectron } from './electron'

const DefaultConfigPath = 'config.toml'
const DefaultConfig = {
  Language: 'en-US',
  Theme: 'light',
  DatabaseFolderPath: '',
  // Proxy
  Proxy: false,
  ProxyProtocol: 'sock',
  ProxyHost: '127.0.0.1',
  ProxyPort: 10809,
  // Download
  WgetPath: 'wget',
  Aria2cPath: 'aria2c',
  DownloadEngine: 'internal',
  // Media Info
  FfprobePath: 'ffprobe',
  MediaInfoPath: 'mediainfo',
  MediaInfoEngine: 'ffprobe',
  // Convert
  FfmpegPath: 'ffmpeg',
  ConvertEngine: 'ffmpeg',
  // Code Parse
  Re: '([A-Za-z]+)-?([0-9]+)',
  // Database
  Database: 'javbus',
  // Filename
  Filename: '[%code%] %title%',
  // Encode
  Extension: 'mp4',
  EncodeMethod: 'cbr',
  Rate: 1000,
  Resolution: 720,
  // Dir
  Folder: '%publisher%',
  // 
  ConvertParallelCount: 1,
  InfoParallelCount: 1,
  ImgParallelCount: 1,
}

export function useConfig() {
  if (!globalThis.config) globalThis.config = {
    get() {
      if (globalThis.config.data) return globalThis.config.data
      if (!existsSync(DefaultConfigPath)) writeFileSync(DefaultConfigPath, stringify(DefaultConfig))
      globalThis.config.data = parse(readFileSync(DefaultConfigPath, 'utf-8'))
      return parse(readFileSync(DefaultConfigPath, 'utf-8'))
    },
    set(key, value) {
      globalThis.config.data[key] = value
      writeFileSync(DefaultConfigPath, stringify(globalThis.config.data))
    },
    overwrite(data) {
      globalThis.config.data = data
      writeFileSync(DefaultConfigPath, stringify(globalThis.config.data))
    },
    recv(pkg) {
      const electron = useElectron()
      switch (pkg.cmd) {
        case 'GetInitConfig':
          electron.send({
            cmd: 'SetInitConfig',
            scope: 'config',
            data: this.get()
          })
          break;
        case 'SetConfig':
          globalThis.config.set(pkg.data.key, pkg.data.value)
          break;
        default:
          break;
      }
    },
  }
  return globalThis.config
}