let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];
let currentColor = "black";
let paletteWidth = 50;
let prevX, prevY;

function setup() {
  createCanvas(600, 400);
  background(255);
  drawPalette();
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * 40, paletteWidth, 40);
  }
}

function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / 40);
    if (index >= 0 && index < colors.length) {
      currentColor = colors[index];
    }
  } else {
    prevX = mouseX;
    prevY = mouseY;
  }
}

function mouseDragged() {
  if (mouseX > paletteWidth) {
    stroke(currentColor);
    strokeWeight(4);
    line(prevX, prevY, mouseX, mouseY);
    prevX = mouseX;
    prevY = mouseY;
  }
}

function draw() {
  drawPalette();
}
