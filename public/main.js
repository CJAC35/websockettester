var socket;
var button;

function setup() {
    createCanvas(600, 400);
    background(51);

    button = createButton("Clear");
    button.mousePressed(function() {
        socket.emit('clear');
    });

    socket = io.connect();
    socket.on('mouse', newDrawing)
    socket.on('clear', clearScreen);
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 10, 10);
}

function clearScreen() {
    background(51);
}

function mouseDragged() {

    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data)

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 10, 10);
}