const {createProxyMiddleware} = require('http-proxy-middleware')
const express = require('express')
const next = require('next')

// 判断开发环境和生产环境
process.env.NODE_ENV = (typeof process.env.NODE_ENV !== 'undefined')
    ? process.env.NODE_ENV.trim()
    : 'development'

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
      const port = parseInt(process.env.PORT, 10) || 3006
// console.log('process.env.NODE_ENV')
// console.log(process.env.img_domain)
      const server = express()

      server.use(
          '/pay/process-payment',
          createProxyMiddleware({
            target: process.env.server_host,
            changeOrigin: true,
          }),
      )

      server.get('*', (req, res) => {
        return handle(req, res)
      })

      server.listen(port, (err) => {
        if (err) throw err
        const serverUrl = `http:127.0.0.1:${port}`
        console.log(`> Ready on ${serverUrl}`)
        // 开发环境自动启动
        // if (dev) {
        //   switch (process.platform) {
        //       //mac系统使用 一下命令打开url在浏览器
        //     case 'darwin':
        //       cp.exec(`open ${serverUrl}`)
        //       break
        //       //win系统使用 一下命令打开url在浏览器
        //     case 'win32':
        //       cp.exec(`start ${serverUrl}`)
        //       break
        //       // 默认mac系统
        //     default:
        //       cp.exec(`open ${serverUrl}`)
        //   }
        // }
      })
    })
