import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import fs from 'fs'
import historyApiFallback from 'connect-history-api-fallback'
import config from 'config'
import Broadcaster from './Broadcaster'
import History from './history/history'

const app = express()

const httpServer = http.createServer(app)

const history = new History()
const broadcaster = new Broadcaster(history)

const path = `${process.cwd()}/dist/client`
const index = `${path}/index.html`
if (fs.existsSync(index)) {
  app
    .use(express.static(path))
    .use(historyApiFallback())
    .get('*', (_, res) => res.sendFile(index))
}

const wss = new WebSocket.Server({ server: httpServer })

broadcaster.start()
broadcaster.on('data', (data: Vehicles.Data) => {
  wss.clients.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
})

const port = config.get('server.port')
httpServer.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`)
})
