function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  
}

function draw() {
  background(200);

  //Graphics Example 1:
  strokeWeight(1);
  stroke(0,0,0);
  fill(255,255,255);
  square(250,150,150);
  circle(150,225,150); 

  //Graphics Example 2: 
  noStroke();
  fill(255,0,0,50);
  circle(225,450,150);
  fill(0,255,0,50);
  circle(175,525,150);
  fill(0,0,255,50);
  circle(275,525,150);

  //Grapics Example 3: 
  noStroke(); 
  fill(255,255,0);
  arc(600,225,150,150,225,135);
  
  fill(255,0,0);
  arc(775,225,150,150,180,0);
  rect(700,225,150,70);

  fill(255,255,255);
  circle(740,220,50,50);
  circle(810,220,50,50);
  fill(0,0,255);
  circle(740,220,35,35);
  circle(810,220,35,35);

  //Graphics Example 4:
  strokeWeight(5);
  stroke(255,255,255);
  fill(0,200,0);
  circle(700,500,200,200);

  strokeWeight(5);
  stroke(255,255,255);
  beginShape();
  fill(0,0,255)
  vertex(700,400); 
  vertex(725,475); 
  vertex(800,475); 
  vertex(740,525); 
  vertex(760,600); 
  vertex(700,550); 
  vertex(640,600); 
  vertex(660,525); 
  vertex(600,475); 
  vertex(675,475); 
  endShape(CLOSE);
}
