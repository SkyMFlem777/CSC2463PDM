let GameStates = Object.freeze({
  START: "start", PLAY: "play", END: "end"
});
let gamestate = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let bugSpriteSheet;
let bugs = [];
let frameIndex = 0;
let frameCount = 5;
let squishFrameIndex = 0;
let squishFrameCount = 0;

function preload() {
  bugSpriteSheet = loadImage('media/bug.png');
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug(random(80, width - 80), random(80, height - 80)));
  }
  setInterval(() => {
    if (time > 0) {
      time--;
    } else {
      gamestate = GameStates.END;
    }
  }, 1000);
}

function draw() {
  background(220);
  
  switch (gamestate) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Press ENTER to Start", width / 2, height / 2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);
      
      for (let bug of bugs) {
        bug.update();
        bug.display();
      }
      frameIndex = (frameIndex + 1) % frameCount;
      squishFrameIndex = (squishFrameIndex + 1) % squishFrameCount;
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Times Up!", width / 2, height / 2 - 20);
      text("Score: " + score, width / 2, height / 2);
      if (score > highScore) {
        highScore = score;
      }
      text("High Score: " + highScore, width / 2, height / 2 + 20);
      break;
  }
}

function keyPressed() {
  switch (gamestate) {
    case GameStates.START:
      if (keyCode == ENTER) {
        gamestate = GameStates.PLAY;
      }
      break;
  }
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      bugs[i].squish();
      bugs.splice(i, 1);
      score++;
      bugs.push(new Bug(random(width), random(height), score * 0.2));
    }
  }
}

class Bug {
  constructor(x, y, speed = 1) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = random(TWO_PI);
    this.squished = false;
    this.squishTime = 0;
  }
  
  update() {
    if (this.squished) {
      this.squishTime++; 

    
      if (this.squishTime > 15) {
        let index = bugs.indexOf(this);
        if (index !== -1) {
          bugs.splice(index, 1); 
          bugs.push(new Bug(random(width), random(height), score * 0.2)); 
        }
      }
    } else {
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
      
      if (this.x < 40 || this.x > width - 40 || this.y < 40 || this.y > height - 40) {
        this.angle += PI; 
      }
    }
  }


  
  display() {
    let sx;
    let sy;

    if (this.squished) {
      sx = squishFrameIndex * 80;
      sy = 80; 
    } else {
      sx = frameIndex * 80;
      sy = 0;  
    }

    push();
    translate(this.x, this.y); 
    rotate(this.angle + HALF_PI); 

    imageMode(CENTER); 
    image(bugSpriteSheet, 0, 0, 80, 80, sx, sy, 80, 80);

    pop();
  }

  
  isClicked(mx, my) {
    return dist(mx, my, this.x + 20, this.y + 20) < 35;
  }

  
  squish() {
    this.squished = true;
    this.squishTime = 0; 
  }
}
