const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)

function socketio() {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    io.emit("connection", socket.id)
    console.log(`'user connected`)

    socket.on('create', (url) => {
      socket.join(url)

      socket.on('editpad', (data) => {
        socket.to(url).emit(url, { url, data })
      })
    })
  })
}

module.exports = { socketio, app, server, express }
