const express = require('express');
const app = express();
const socketio = require('socket.io')

const Namespaces = require('./data/Namespaces');
const Room = require('./classes/Room');

app.use(express.static(__dirname + '/public'));

const expressserver = app.listen(9000, () => console.log("Server is running on 9000."));
const io = socketio(expressserver)


app.get('/change-ns', (req, res) => {
    Namespaces[0].addRoom(new Room(0, 'Deleted Artical', 0))
    io.of(Namespaces[0].endpoint).emit('nsChange', Namespaces[0])
    res.json(Namespaces[0])
})


io.on('connection', (socket) => {
    socket.emit('Welcome', "Welcome to the server!");
    socket.on('clientConnect', (data) => {
        console.log(socket.id, "has connected.")
        socket.emit('nsList', Namespaces)
    })
})

Namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`${socket.id} has connected to ${namespace.endpoint}`)

        socket.on('joinRoom', async (roomTitle, ackCallBack) => {

            const rooms = socket.rooms;
         //   console.log(rooms);

            let i = 0;
            rooms.forEach(room => {
                if(i !== 0) {
                    socket.leave(room)
                }
                i++;
            })

            socket.join(roomTitle);

            const sockets = await io.of(namespace.endpoint).in(roomTitle).fetchSockets();
            // console.log(sockets);
            const socketsCount = sockets.length
            ackCallBack({
                numUsers: socketsCount
            })
        })

        socket.on('newMessageFromRoom', messageobj => {
            console.log(messageobj)

            const rooms = socket.rooms;
            const currentRoom = [...rooms][1];
            io.of(namespace.endpoint).in(currentRoom).emit('messageToRoom', messageobj)
        })
    })
})