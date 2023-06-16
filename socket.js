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

  const peoples = []

  io.on('connection', (socket) => {
    io.emit('connection', socket.id)
    console.log('user connected')

    socket.on('create', (url) => {
      socket.join(url)

      socket.on('editpad', (data) => {
        socket.to(url).emit(url, { url, data })
      })
    })

    socket.on('create_room', (chat_room) => {
      socket.join(chat_room.name)
      console.log('user loged in room')
      peoples.push({
        username: chat_room.username,
        room: chat_room.name,
        user_id: socket.id
      })
      console.log({ peoples })
      socket.on('send_message', (message) => {
        socket.to(chat_room.name).emit(chat_room.name, { user_id: socket.id, username: peoples.filter((p) => p.user_id === socket.id)[0].username, message })
      })
    })


    socket.on('disconnect', (reason) => {
      console.log(reason)
    });
  })
}

module.exports = { socketio, app, server, express }
