
const express = require('express');

var app = express();
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = app.listen(app.get('port'));

app.use(express.static('public'));

console.log("Socket server running...");

const socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("new connection: " + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

}