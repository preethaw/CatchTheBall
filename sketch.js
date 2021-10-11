const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var leftWall, rightWall, topWall;
var handsImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var lives = 4;
var catches = 0;
var invisibleHand;

var balls = [];
var gameState = "initial";
var numberOfballs = 5;

function preload() {
  handsImg = loadImage("./hands.png");
}

function setup() {
  var canvas = createCanvas(500, 500);
  engine = Engine.create();
  world = engine.world;

  topWall = new Box(250, 0, 490, 20);
  leftWall = new Box(5, 250, 15, 500);
  rightWall = new Box(490, 250, 15, 500);

  obstacle1 = new Box(201, 70, 380, 15);
  obstacle2 = new Box(341, 150, 285, 15);
  obstacle3 = new Box(138, 220, 250, 15);

  obstacle4 = new Box(300, 280, 135, 15);
  obstacle5 = new Box(121, 325, 220, 15);

  obstacle6 = new Box(320, 380, 280, 15);

  invisibleHand = new Box(100, 480, 30, 30);

  Matter.Body.setStatic(invisibleHand.body, false);
  Matter.Body.setVelocity(invisibleHand.body, { x: 5, y: 0 });
}

function draw() {
  background("#424242");
  Engine.update(engine);

  fill("#4aedc4");
  textSize(15);
  text("Chances : " + numberOfballs, 200, 35);
  text("Catches : " + catches, 300, 35);
  text("Lives : " + lives, 390, 35);

  if (gameState === "initial") {
    fill("#4aedc4");
    textSize(20);
    text("Click And Play", 180, 200);
  }
  createWalls(); 
  
  if (gameState === "play") {
    movingHands();
   // invisibleHand.display();
    showBall();
    var posX = invisibleHand.body.position.x;
    var posY = invisibleHand.body.position.y;

    image(handsImg, posX - 42, posY - 55, 80, 80);
    

  }

  if (lives === 0) {
    gameState = "over";
  }

  if (gameState === "over") {
    text("Game Over", 180, 200);
  }
}

function createWalls(){
  topWall.display();
  leftWall.display();
  rightWall.display();

  obstacle1.display();
  obstacle1.setAngel(0.07);

  obstacle2.display();
  obstacle2.setAngel(-0.1);

  obstacle3.display();
  obstacle3.setAngel(0.03);

  obstacle4.display();
  obstacle5.display();

  obstacle6.display();
  obstacle6.setAngel(-0.2);

}

function showBall() {
  for (var i = 0; i < balls.length; i++) {
    if (balls[i]) {
      balls[i].display();

      var distance = dist(
        balls[i].body.position.x,
        balls[i].body.position.y,
        invisibleHand.body.position.x,
        invisibleHand.body.position.y
      );

      if (balls[i].body.position.y >= 500 && lives > 0) {
        lives -= 1;
        delete balls[i];
      }

      if (distance <= 50) {
        catches += 1;
        delete balls[i];
      }
    }
  }
}

function mousePressed() {
  if (numberOfballs > 0 && gameState === "play") {
  
    var ball = new Ball(40, 20, 15);
    balls.push(ball);
    numberOfballs -= 1;
  }

  if (gameState === "initial") {
    gameState = "play";
  }
}

function movingHands() {


  
  if (invisibleHand.body.position.x >= 445) {
    Matter.Body.setVelocity(invisibleHand.body, { x: -5, y: 0 });
  }

  if (invisibleHand.body.position.x <= 50) {
    Matter.Body.setVelocity(invisibleHand.body, { x: 5, y: 0 });
  }

  Matter.Body.setPosition(invisibleHand.body, {
    x: invisibleHand.body.position.x,
    y: 480
  });
}
