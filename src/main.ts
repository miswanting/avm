// import { app, BrowserWindow, ipcMain } from 'electron'
// import { spawn } from 'child_process'
// import TOML from '@iarna/toml'
// import { existsSync, writeFileSync, readFileSync } from 'fs'
// import Crawler from 'crawler'
// import { getVideoInfo, getCover, testConnection } from './modules/spider'

import { useElectron } from './modules/electron'

const electron = useElectron()

electron.start()

// app.whenReady().then(function () {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   })
//   win.loadFile('dist/index.html')
//   win.webContents.openDevTools()
//   ipcMain.on('pkg', (e, pkg) => {
//     console.log('Recv:', pkg);
//     if (pkg.cmd === 'getVideoInfo') {
//       getVideoInfo(pkg.code, (d) => {
//         d.cmd = 'setVideoInfo'
//         d.id = pkg.id
//         win.webContents.send('pkg', d)
//       })
//       // const result = {
//       //   cmd: 'setVideoInfo',
//       //   id: pkg.id,
//       //   coverPath: undefined,
//       //   title: undefined,
//       //   code: undefined,
//       //   release: undefined,
//       //   director: undefined,
//       //   producer: undefined,
//       //   publisher: undefined,
//       //   series: undefined,
//       //   actors: undefined,
//       // }
//       // const htmlCrawler = new Crawler({
//       //   maxConnections: 1,
//       //   callback: function (err, res, done) {
//       //     if (err) { console.log(err) } else {
//       //       const $ = res.$
//       //       result.coverPath = `https://www.javbus.com${$('.bigImage img').attr('src')}`
//       //       result.title = $('.bigImage img').attr('title')
//       //       result.code = $('.info p:nth-child(1) span:nth-child(2)').text()
//       //       result.release = $('.info p:nth-child(2) a').text()
//       //       result.director = $('.info p:nth-child(4) a').text()
//       //       result.producer = $('.info p:nth-child(5) a').text()
//       //       result.publisher = $('.info p:nth-child(6) a').text()
//       //       result.series = $('.info p:nth-child(7) a').text()
//       //       result.actors = $('.info p:nth-child(12) span').text()
//       //       win.webContents.send('pkg', result)
//       //     }
//       //   }
//       // })
//       // htmlCrawler.queue({
//       //   uri: `https://www.javbus.com/${pkg.code}`,
//       //   proxy: 'sock://127.0.0.1:10809'
//       // })
//     }
//     if (pkg.cmd === 'getVideoCover') {
//       getCover(pkg.coverPath, (d) => {
//         win.webContents.send('pkg', {
//           cmd: 'setVideoCover',
//           id: pkg.id,
//           data: d
//         })
//       })
//       // const result = {
//       //   cmd: 'setVideoCover',
//       //   id: pkg.id,
//       //   data: undefined,
//       // }
//       // const imageCrawler = new Crawler({
//       //   encoding: null,
//       //   maxConnections: 1,
//       //   jQuery: false,
//       //   callback: function (err, res, done) {
//       //     if (err) { console.log(err) } else {
//       //       console.log(res.statusCode);
//       //       result.data = res.body
//       //       win.webContents.send('pkg', result)
//       //     }
//       //     done()
//       //   }
//       // })
//       // imageCrawler.queue({
//       //   uri: pkg.coverPath,
//       //   proxy: 'sock://127.0.0.1:10809'
//       // })
//     } else if (pkg.cmd === 'getVideoFrames') {
//       let msg = ''
//       const c = spawn('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-count_frames', '-show_entries', 'stream=nb_read_frames', '-print_format', 'json', `${pkg.dir}\\${pkg.base}`])
//       c.stdout.on('data', (data) => {
//         msg += data.toString()
//         console.log();
//       })
//       c.stderr.on('data', (data) => {
//         console.log('ERR-------------------');
//         console.log(data.toString());
//       })
//       c.on('close', (data) => {
//         console.log('CLO-------------------');
//         console.log(data.toString());
//         win.webContents.send('pkg', {
//           cmd: 'setVideoFrames',
//           id: pkg.id,
//           frames: JSON.parse(msg).streams[0].nb_read_frames
//         })
//       })
//     } else if (pkg.cmd === 'convert') {
//       const c = spawn('ffmpeg', ['-y', '-i', `${pkg.dir}\\${pkg.base}`, '-progress', '-', '-nostats', `${pkg.filename}.mp4`])
//       c.stdout.on('data', (data) => {
//         console.log('OUT-------------------');
//         const msg = data.toString()
//         win.webContents.send('pkg', {
//           cmd: 'updateProgress',
//           id: pkg.id,
//           progress: msg.split('\n')[0].split('=')[1].trim(),
//         })
//       })
//       c.stderr.on('data', (data) => {
//         console.log('ERR-------------------');
//         console.log(data.toString());
//       })
//       c.on('close', (data) => {
//         console.log('CLO-------------------');
//         console.log(data.toString());
//         win.webContents.send('pkg', {
//           cmd: 'convertDone',
//           id: pkg.id,
//         })
//       })
//     } else if (pkg.cmd === 'getConfig') {
//       const configFileName = 'config.toml'
//       if (!existsSync(configFileName)) {
//         writeFileSync(configFileName, TOML.stringify({
//           // Proxy
//           proxy: false,
//           proxyProtocol: 'sock',
//           proxyHost: '127.0.0.1',
//           proxyPort: 10809,
//           // Download
//           wgetPath: 'wget',
//           aria2cPath: 'aria2c',
//           downloadEngine: 'internal',
//           // Media Info
//           ffprobePath: 'ffprobe',
//           mediaInfoPath: 'mediainfo',
//           mediaInfoEngine: 'ffprobe',
//           // Convert
//           ffmpegPath: 'ffmpeg',
//           convertEngine: 'ffmpeg',
//           // Code Parse
//           re: '([a-zA-Z]+-?[0-9]+)',
//           // Database
//           database: 'javbus',
//           // Filename
//           filename: '[%code%] %name%',
//           // Encode
//           extension: 'mp4',
//           encodeMethod: 'cbr',
//           rate: 1000,
//           resolution: 720,
//           // Dir
//           folder: '%publisher%',
//         }))
//       }
//       const result = {
//         cmd: 'setConfig',
//         data: TOML.parse(readFileSync(configFileName))
//       }
//       win.webContents.send('pkg', result)
//     } else if (pkg.cmd === 'testConnection') {
//       testConnection((r) => {
//         win.webContents.send('pkg', {
//           cmd: 'testResult',
//           value: r
//         })
//       })
//     }
//   })
// })