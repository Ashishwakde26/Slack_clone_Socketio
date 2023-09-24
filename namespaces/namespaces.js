const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressserver = app.listen(8000, () => console.log("Server is running on 8000."));
const io = socketio(expressserver)

io.of("/").on('connection', (socket) => {
//io.on('connection', (socket) => {
    console.log(socket.id, "Has connected.")

    socket.on('newMessageToServer', (dataFromClient) => {
        console.log("Data:",dataFromClient)
        io.of("/").emit('newMessageToClient', {text: dataFromClient.text})
      //  io.emit('newMessageToClient', {text: dataFromClient.text})
    })
})


io.of("/admin").on('connection', (socket) => {
    console.log(socket.id, "Has joied /admin")
})