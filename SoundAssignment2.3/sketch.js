let basicSynth, filt, LFOfilt;
let ufo;
let showImage = false;
let imageTimer = 0;
const displayDuration = 3; 

function preload() {
  ufo = loadImage("media/ufo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  filt = new Tone.Filter(300, "lowpass", -48).toDestination();
  basicSynth = new Tone.Synth().connect(filt);
  LFOfilt = new Tone.LFO(displayDuration, 200, 2000).start();
  LFOfilt.connect(filt.frequency);
}

function draw() {
  background(200,windowWidth,windowHeight);
  textAlign(CENTER);
  text("CLICK TO ABDUCT ALL THE COWS!!!", windowWidth/2, windowHeight/8);

  if (showImage) {
    image(ufo, windowWidth / 2 - ufo.width / 2, windowHeight / 2 - ufo.height / 2);
    
    if (millis() >= imageTimer) {
      showImage = false;
    }
  }
}

function mouseClicked() {
  basicSynth.triggerAttackRelease(random(200, 400), 3);

  showImage = true;
  imageTimer = millis() + displayDuration * 1000;
}
