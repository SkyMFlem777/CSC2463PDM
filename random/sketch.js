let polySynth
let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C4',
  'f': 'D4',
  'h': 'E4',
  'j': 'F4',
  'k': 'G4',
  'l': 'A5'
}

function setup() {
  createCanvas(400, 400);
  polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
  polySynth.portamento.val = 0.5;
  //use a different synth !
}

function draw() {
  background(220);
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch && key !== activeKey) {
    polySynth.triggerRelease();
    activeKey = key; 
    polySynth.triggerAttack(pitch);
  }
}

function keyReleased() {
  let pitch = keyNotes[key]
  if (pitch) {
    polySynth.triggerRelease(pitch);
  }
}