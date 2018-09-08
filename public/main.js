var socket;

function setup() {
    createCanvas(600, 400);
    background(51);

    socket = io.connect();
    socket.on('mouse', newDrawing)
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 10, 10);
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

function draw() {
}