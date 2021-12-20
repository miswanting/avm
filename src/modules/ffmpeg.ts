import { spawn } from 'child_process'
import { join } from 'path'

import { useElectron } from './electron'
import { useTmp } from './tmp'

export interface ffmpeg {
  probe(path: string, options?: object),
  convert(input: string, output: string, options?: object),
  recv(pkg: any),
}

export function useFfmpeg(): ffmpeg {
  if (!globalThis.ffmpeg) globalThis.ffmpeg = {
    probe(path: string, options?: any) {
      const electron = useElectron()
      const cp = spawn('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-count_frames', '-show_entries', 'stream=nb_read_frames', '-print_format', 'json', `${path}`])
      let msg = ''
      cp.stdout.on('data', (data) => {
        msg += data.toString()
      })
      cp.stderr.on('data', (data) => {
      })
      cp.on('close', (data) => {
        electron.sendPkg('SetVideoFrames', 'task', {
          vid: options.vid,
          frames: JSON.parse(msg).streams[0].nb_read_frames
        })
      })
    },
    convert(input: string, options?: any) {
      const electron = useElectron()
      const tmp = useTmp()
      const destPath = join(tmp.get().name, `${options.vid}.mp4`)
      electron.sendPkg('SetTmpPath', 'task', {
        vid: options.vid,
        path: destPath,
      })
      const cp = spawn('ffmpeg', ['-y', '-i', `${input}`, '-progress', '-', '-nostats', destPath])
      cp.stdout.on('data', (data) => {
        const msg = data.toString()
        electron.sendPkg('Update', 'task', {
          vid: options.vid,
          progress: msg.split('\n')[0].split('=')[1].trim(),
        })
      })
      cp.stderr.on('data', (data) => {
      })
      cp.on('close', (data) => {
        electron.sendPkg('Done', 'task', {
          vid: options.vid,
        })
      })
    },
    recv(pkg: any) {
      const electron = useElectron()
      switch (pkg.cmd) {
        case 'Probe':
          this.probe(pkg.data.path, pkg.data)
          break;
        case 'ConvertToTemp':
          this.convert(pkg.data.path, pkg.data)
          break;
        default:
          break;
      }
    },
  }
  return globalThis.ffmpeg
}