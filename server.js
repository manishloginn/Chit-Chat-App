

const express = require('express');

const expressServer = express()

const http = require('http');

const socket = require('socket.io');

const SocketIoServer = socket.Server


const httpServer = http.createServer(expressServer)

const io = new SocketIoServer(httpServer)




function started(){
    console.log('this is fine')
}


io.on('connection', socket=> {
  socket.on('sendingMsgEvent', data => {
    io.emit('spreadmsg', data)
  })
});


expressServer.use(express.static('client'));

httpServer.listen(8888, started)