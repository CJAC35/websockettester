
const express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("Socket server running...");

const socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("new connection: " + socket.id);

    socket.on('mouse', mouseMsg);
    socket.on('clear', clearCanvas);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

    function clearCanvas() {
        io.emit('clear');
    }
    
}