let ninja;
let purple;
let tchalla;

function preload() {
  ninja = loadImage ("media/ninja.png");
  purple = loadImage ("media/purple.png");
  tchalla = loadImage ("media/tchalla.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  ninjaSprite = new Character (random(80, width - 80), random(80, height - 80));
  ninjaSprite.addAnimation("idle", new SpriteAnimation (ninja, 0, 0, 1));
  ninjaSprite.addAnimation("down", new SpriteAnimation (ninja, 6, 5, 6));
  ninjaSprite.addAnimation("up", new SpriteAnimation (ninja, 0, 5, 6));
  ninjaSprite.addAnimation("right", new SpriteAnimation (ninja, 0, 0, 8));
  ninjaSprite.addAnimation("left", new SpriteAnimation (ninja, 0, 0, 8)); 

  purpleSprite = new Character (random(80, width - 80), random(80, height - 80));
  purpleSprite.addAnimation("idle", new SpriteAnimation (purple, 0, 0, 1));
  purpleSprite.addAnimation("down", new SpriteAnimation (purple, 6, 5, 6));
  purpleSprite.addAnimation("up", new SpriteAnimation (purple, 0, 5, 6));
  purpleSprite.addAnimation("right", new SpriteAnimation (purple, 0, 0, 8));
  purpleSprite.addAnimation("left", new SpriteAnimation (purple, 0, 0, 8)); 

  tchallaSprite = new Character (random(80, width - 80), random(80, height - 80));
  tchallaSprite.addAnimation("idle", new SpriteAnimation (tchalla, 0, 0, 1));
  tchallaSprite.addAnimation("down", new SpriteAnimation (tchalla, 6, 5, 6));
  tchallaSprite.addAnimation("up", new SpriteAnimation (tchalla, 0, 5, 6));
  tchallaSprite.addAnimation("right", new SpriteAnimation (tchalla, 0, 0, 8));
  tchallaSprite.addAnimation("left", new SpriteAnimation (tchalla, 0, 0, 8)); 

  ninjaSprite.currentAnimation = "idle";
  purpleSprite.currentAnimation = "idle";
  tchallaSprite.currentAnimation = "idle";

}

function draw() {
  background(220);
  ninjaSprite.draw();
  purpleSprite.draw();
  tchallaSprite.draw();
}

function keyPressed() {
  ninjaSprite.keyPressed();
  purpleSprite.keyPressed();
  tchallaSprite.keyPressed();
}

function keyReleased() {
  ninjaSprite.keyReleased();
  purpleSprite.keyReleased();
  tchallaSprite.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation; 
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
        case "right":
          this.x += 2; 
          break;
        case "left": 
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this. y);
      animation.draw(); 
      pop(); 
    }
  }

  keyPressed() { 
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW: 
        this.currentAnimation = "down";
        break; 
      case RIGHT_ARROW:
        this.currentAnimation = "right"; 
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true; 
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "idle";
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration; 
    this.startU = startU;
    this.frameCount = 0; 
    this.flipped = false;
  }

  draw() {
    let s = (this.flipped) ? -1 : 1; 
    scale (s,1);
    image (this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80); 

    this.frameCount++; 
    if (this.frameCount % 10 === 0) {
      this.u++; 
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}