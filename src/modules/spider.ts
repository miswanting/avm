import Crawler from 'crawler'
export function testConnection(callback) {
  const testCrawler = new Crawler({
    maxConnections: 1,
    callback: function (err, res, done) {
      if (err) {
        callback(false)
      } else {
        callback(true)
      }
    }
  })
  testCrawler.queue({
    uri: `https://www.javbus.com/`,
    proxy: 'sock://127.0.0.1:10809'
  })
}
export function getVideoInfo(code, callback) {
  const htmlCrawler = new Crawler({
    maxConnections: 1,
    callback: function (err, res, done) {
      if (err) { console.log(err) } else {
        const $ = res.$
        callback({
          coverPath: `https://www.javbus.com${$('.bigImage img').attr('src')}`,
          title: $('.bigImage img').attr('title'),
          code: $('.info p:nth-child(1) span:nth-child(2)').text(),
          release: $('.info p:nth-child(2) a').text(),
          director: $('.info p:nth-child(4) a').text(),
          producer: $('.info p:nth-child(5) a').text(),
          publisher: $('.info p:nth-child(6) a').text(),
          series: $('.info p:nth-child(7) a').text(),
          actors: $('.info p:nth-child(12) span').text(),
        })
      }
    }
  })
  htmlCrawler.queue({
    uri: `https://www.javbus.com/${code}`,
    proxy: 'sock://127.0.0.1:10809'
  })
}
export function getCover(uri, callback) {
  const imageCrawler = new Crawler({
    encoding: null,
    maxConnections: 1,
    jQuery: false,
    callback: function (err, res, done) {
      if (err) { console.log(err) } else {
        callback(res.body)
      }
      done()
    }
  })
  imageCrawler.queue({
    uri,
    proxy: 'sock://127.0.0.1:10809'
  })
}