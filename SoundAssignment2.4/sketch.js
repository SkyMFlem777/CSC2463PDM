let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"];
let currentColor = "black";
let paletteWidth = 50;
let prevX, prevY;
let painting = false;
let synth;
let strokeSynth;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let drawingIntensity = 0;
let lastStrokeTime = 0;

function setup() {
  let startButton = createButton('Start Audio');
  startButton.position(canvas.width - 110, 10);
  startButton.mousePressed(() => {
    if (Tone.context.state !== 'running') {
      Tone.start().then(() => console.log('Audio context started'));
    }
    console.log('Audio context started');
  });
  createCanvas(600, 400);
  background(255);
  drawPalette();
  synth = new Tone.PolySynth().toDestination();

strokeSynth = new Tone.Synth().toDestination();
  // Limit polyphony to avoid overload
  loopMusic();
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * 40, paletteWidth, 40);
  }
}

function loopMusic() {
  setInterval(() => {
    let note = random(notes);
    let velocity = map(drawingIntensity, 0, width * height, 0.1, 0.5);
    synth.triggerAttackRelease(note, '150ms', undefined, velocity);
    
  }, 800);
}

function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / 40);
    if (index >= 0 && index < colors.length) {
      currentColor = colors[index];
      synth.triggerAttackRelease("C5", '200ms', undefined, 0.5);
    }
  } else {
    prevX = mouseX;
    prevY = mouseY;
  }
}

function mouseDragged() {
  if (mouseX > paletteWidth) {
    painting = true;
    stroke(currentColor);
    strokeWeight(4);
    line(prevX, prevY, mouseX, mouseY);
    prevX = mouseX;
    prevY = mouseY;
    drawingIntensity += 10;
    
    let now = millis();
    if (now - lastStrokeTime > 100) { // Throttle sound effect frequency
      let strokeNote = random(notes);
      strokeSynth.triggerAttackRelease(strokeNote, '80ms', undefined, 0.3);
      lastStrokeTime = now;
    }
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(255);
    drawPalette();
    drawingIntensity = 0;
    synth.triggerAttackRelease("G3", '500ms', undefined, 0.5);
  }
}

function draw() {
  drawPalette();
}
