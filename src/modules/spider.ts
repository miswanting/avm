import { SocksProxyAgent } from 'socks-proxy-agent';
import { useElectron } from './electron';
import fetch from 'node-fetch'
import { load } from 'cheerio';
import { writeFileSync } from 'fs';

export function useSpider() {
  if (!globalThis.spider) globalThis.spider = {
    gerInfo(pkg) {
      const electron = useElectron()
      fetch(`https://www.javbus.com/${pkg.data.code}`, {
        agent: new SocksProxyAgent(process.env.socks_proxy || 'socks://127.0.0.1:10808')
      }).then(function (res) {
        return res.text()
      }).then(function (res) {
        const $ = load(res)
        console.log($('title').text());
        electron.sendPkg('SetVideoInfo', 'task', {
          vid: pkg.data.vid,
          code: $('.info > p').eq(0).children('span').eq(1).text().trim().toUpperCase(),
          title: $('.bigImage').children('img').attr('title'),
          coverUrl: `https://www.javbus.com${$('.bigImage').attr('href')}`,
        })
      })
    },
    getCover(pkg) {
      const electron = useElectron()
      fetch(pkg.data.coverUrl, {
        agent: new SocksProxyAgent(process.env.socks_proxy || 'socks://127.0.0.1:10808')
      }).then(function (res) {
        return res.arrayBuffer()
      }).then(function (res) {
        electron.sendPkg('SetVideoCover', 'task', {
          vid: pkg.data.vid,
          res
        })
        // writeFileSync(`${pkg.data.code}.jpg`, new Uint8Array(res))
      })
    },
    recv(pkg: any) {
      const electron = useElectron()
      switch (pkg.cmd) {
        case 'GetVideoInfo':
          this.gerInfo(pkg)
          break;
        case 'GetVideoCover':
          this.getCover(pkg)
          break;
        default:
          break;
      }
    },
  }
  return globalThis.spider
}
