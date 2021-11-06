import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import fs from 'fs'
import Broadcaster from './Broadcaster'
import config from 'config'

const app = express()

// Create own HTTP server instead of using app.listen() in order to share the same port with WS
const httpServer = http.createServer(app)

// Initating all middleware for express
const path = `${process.cwd()}/dist/client`
if (fs.existsSync(`${path}/index.html`)) {
  app.use(express.static(path))

  app.get('/', (_, res) => {
    res.render('index')
  })
}

// Initiate websocket server with the same server as express
const wss = new WebSocket.Server({ server: httpServer })

// Create new Broadcaster
// Maybe you can add multiple broadcaster for multiple bus using the same data to make it a little interesting
const broadcaster = new Broadcaster()

broadcaster.start()
broadcaster.on('data', (data: Vehicles.Data) => {
  // Send data to all connected clients on websocket
  wss.clients.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
})

// Start listening on port 3000 for both express app and WS server
const port = config.get('server.port')
httpServer.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`)
})
