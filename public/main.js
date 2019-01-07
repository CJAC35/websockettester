var socket;
var button;
var curcolor;
var dropdown;

function setup() {
    createCanvas(600, 400);
    background(51);

    curcolor = color(255);

    dropdown = createSelect();
    dropdown.option('White', color(255));
    dropdown.option('Red', color(255, 0, 0));
    dropdown.option('Orange', color(255, 102, 0));
    dropdown.option('Yellow', color(255, 255, 0));
    dropdown.option('Green', color(0, 153, 51));
    dropdown.option('Blue', color(51, 51, 255));
    dropdown.option('Violet', color(204, 0, 255));

    dropdown.changed(mySelectEvent);

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
    fill(data.color);
    ellipse(data.x, data.y, 10, 10);
}

function clearScreen() {
    background(51);
}

function mouseDragged() {
    var data = {
        x: mouseX,
        y: mouseY,
        color: color
    }
    socket.emit('mouse', data)

    noStroke();
    fill(curcolor);
    ellipse(mouseX, mouseY, 10, 10);
}

function mySelectEvent() {
    var selected = this.selected();
    curcolor = selected;
}