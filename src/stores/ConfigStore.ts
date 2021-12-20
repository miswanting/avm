export default {
  namespaced: true,
  state: () => ({
    // Proxy
    proxy: false,
    proxyProtocol: 'sock',
    proxyHost: '127.0.0.1',
    proxyPort: 10809,
    // Download
    wgetPath: 'wget',
    aria2cPath: 'aria2c',
    downloadEngine: 'internal',
    // Media Info
    ffprobePath: 'ffprobe',
    mediaInfoPath: 'mediainfo',
    mediaInfoEngine: 'ffprobe',
    // Convert
    ffmpegPath: 'ffmpeg',
    convertEngine: 'ffmpeg',
    // Code Parse
    re: '$$$',
    // Database
    database: 'javbus',
    // Filename
    filename: '[%code%] %name%',
    // Encode
    extension: 'mp4',
    encodeMethod: 'cbr',
    rate: 1000,
    resolution: 720,
    // Dir
    folder: '%publisher%',
  }),
}