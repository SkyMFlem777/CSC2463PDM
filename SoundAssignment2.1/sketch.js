let startContext, samples, sampler, button1, button2, button3, button4;
let del = new Tone.FeedbackDisplay(0, 0.9).toDestination()

function preload() {
  //sampler = new tone.Player("media/funnycatmeow.mp3").toDestination();
  samples = new Tone.Players({
    cat: "media/funnycatmeow.mp3",
    buzzer: "media/buzzer.mp3",
    plasma: "media/plasmagun.mp3",
    bubbles: "media/bubblewrap.mp3"
  }).connect();
}

function setup() {
  createCanvas(400, 400);

  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext);

  button1 = createButton("funny cat meow");
  button1.position(10,30);
  button1.mousePressed(() => {samples.player("cat").start()});

  button2 = createButton("WRONG");
  button2.position(150,30);
  button2.mousePressed(() => {samples.player("buzzer").start()});

  button3 = createButton("plasma ray");
  button3.position(10,150);
  button3.mousePressed(() => {samples.player("plasma").start()});

  button4 = createButton("bubble wrap");
  button4.position(150,150);
  button4.mousePressed(() => {samples.player("bubbles").start()});

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200,100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
}

function draw() {
  background(220);
}

function startAudioContext() {
  if (Tone.context.state |= 'running') {
    Tone. starts
    console. log("Audio Context Started");
} else 
  {
    console. log("Audio Context is already running");
  } 
}
