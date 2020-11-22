const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
//const Events = Matter.Events;
 
var ground;
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var gameState = "play";
var count = 0;

function setup() {

  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height, width, 20);
  
  for (var k = 0; k <= width; k = k + 80){
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  
  for (var j = 75; j <= width; j = j+50){
    plinkos.push(new Plinko(j, 75));
  }
  for (var j = 50; j <= width-10; j = j+50){
    plinkos.push(new Plinko(j, 175));
  }
  for (var j = 75; j <= width; j = j+50){
    plinkos.push(new Plinko(j, 275));
  }
  for (var j = 50; j <= width-10; j = j+50){
    plinkos.push(new Plinko(j, 375));
  }

  Engine.run(engine);

}
 
function draw() {

  background("black");
  ground.display();
  textAlign(LEFT);
  textSize(20);
  text("Score : "+score, 10, 30);

  textAlign(CENTER);
  text("500", 40, 550);
  text("500", 40+80*1, 550);
  text("500", 40+80*2, 550);
  text("500", 40+80*3, 550);
  text("100", 40+80*4, 550);
  text("100", 40+80*5, 550);
  text("100", 40+80*6, 550);
  text("200", 40+80*7, 550);
  text("200", 40+80*8, 550);
  text("200", 40+80*9, 550);

  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++){
    plinkos[i].display();
  }
  
  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  if(particle != null && gameState == "play"){
    particle.display();
    if(particle.body.position.y > 700) {
      if(particle.body.position.x < 320) {
        score = score + 500;
        particle = null;
        if(count >= 5){
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 560 && particle.body.position.x > 320) {
        score = score + 100;
        particle = null;
        if(count >= 5){
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 801 && particle.body.position.x > 560){
        score = score + 200;
        particle = null;
        if(count >= 5){
          gameState = "end";
        }
      }
    }
  }
  
  if(gameState == "end"){
    textSize(80);
    fill("brown");
    text("Game Over", width/2, height/2-100);
    fill("white");
    textSize(20);
    text("Press 'Space' to restart the game!!", width/2 , 30)
  }


}


function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}

function keyPressed(){
  if (keyCode === 32 && gameState == "end"){
    gameState = "play";
    score = 0;
    count = 0;
  }
}