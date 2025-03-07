let polySynth;
let activeKey = null;
let portSlider;

let keyNotes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'h': 'G4',
  'j': 'A4',
  'k': 'B4',
  'l': 'G#4'
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  polySynth = new Tone.PolySynth(Tone.Synth, {
    options: {
      portamento: 0,
    }
  }).toDestination();

  portSlider = createSlider(0, 1, 0, 0.01);
  portSlider.position(150, height / 3);
}

function draw() {
  background(220);
  text("use these keys to play: A, S, D, F, H, J, K, L + Enjoy :) !", width / 6, height / 6);
  
  text("Portamento Level: " + portSlider.value(), 150, height / 3.2);

  text("a", 150, height/4);
  text("s", 175, height/4);
  text("d", 200, height/4);
  text("f", 225, height/4);
  text("h", 250, height/4);
  text("j", 275, height/4);
  text("k", 300, height/4);
  text("l", 325, height/4);

  polySynth.set({ portamento: portSlider.value() });
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch && key !== activeKey) {
    activeKey = key;
    polySynth.triggerAttack(pitch);
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerRelease(pitch);
  }
}
