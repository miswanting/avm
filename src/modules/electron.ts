import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { useCache } from './cache'
import { useConfig } from './config'
import { useDatabase } from './database'
import { useFfmpeg } from './ffmpeg'
import { useSpider } from './spider'

export interface NetPackage {
  cmd: string,
  scope?: string,
  data?: any,
}

export interface Electron {
  start()
  sendPkg(cmd: string, scope?: string, options?: any)
  send(pkg: NetPackage)
  recv(pkg: NetPackage)
}

export function useElectron(): Electron {
  if (!globalThis.electron) globalThis.electron = {
    start() {
      app.whenReady().then(function () {
        const bw = new BrowserWindow({
          frame: false,
          transparent: true,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
          }
        })
        bw.loadFile('dist/index.html')
        bw.webContents.openDevTools()
        ipcMain.on('pkg', (e, pkg) => {
          globalThis.electron.recv(pkg)
        })
      })
    },
    sendPkg(cmd, scope?, options?) {
      this.send({ cmd, scope, data: options })
    },
    send(pkg) {
      console.log('Send:', pkg);
      BrowserWindow.getAllWindows()[0].webContents.send('pkg', pkg)
    },
    recv(pkg: any) {
      console.log('Recv:', pkg);
      const cache = useCache()
      const config = useConfig()
      const database = useDatabase()
      const ffmpeg = useFfmpeg()
      const spider = useSpider()
      switch (pkg.scope) {
        case 'cache':
          cache.recv(pkg)
          break;
        case 'config':
          config.recv(pkg)
          break;
        case 'database':
          database.recv(pkg)
          break;
        case 'ffmpeg':
          ffmpeg.recv(pkg)
          break;
        case 'spider':
          spider.recv(pkg)
          break;
        case 'electron':
          globalThis.electron.thisRecv(pkg)
          break;
        default:
          console.warn('PKG Loss:', pkg)
          break;
      }
    },
    thisRecv(pkg) {
      switch (pkg.cmd) {
        case 'ShowSetDatabaseFolderDialog':
          const path = dialog.showOpenDialogSync(BrowserWindow.getAllWindows()[0], {
            properties: ['openDirectory']
          })
          this.sendPkg('SetDatabaseFolder', 'database', {
            path: path[0]
          })
          break;
        case 'MinimizeWindow':
          BrowserWindow.getAllWindows()[0].minimize()
          break;
        case 'MaximizeWindow':
          if (BrowserWindow.getAllWindows()[0].isMaximized()) BrowserWindow.getAllWindows()[0].unmaximize()
          else BrowserWindow.getAllWindows()[0].maximize()
          break;
        case 'CloseWindow':
          BrowserWindow.getAllWindows()[0].close()
          break;
        default:
          break;
      }
    }
  }
  return globalThis.electron
}